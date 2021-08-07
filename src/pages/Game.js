import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import { setUpdateScore } from '../actions';
import Header from '../components/Header';
import './Game.css';

const TIMER = 30;
const SECOND = 1000;
const RAND = 0.7;
const ADJUST = -2;
const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const CORRECT = 'correct-answer';
const WRONG = 'wrong-answer';

class Game extends Component {
  constructor(props) {
    super(props);

    this.color = this.color.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.prepareTrivia = this.prepareTrivia.bind(this);
    this.disableAnswers = this.disableAnswers.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.adjustTimerStyle = this.adjustTimerStyle.bind(this);
    this.identifyDifficulty = this.identifyDifficulty.bind(this);

    this.state = { questions: [], isLoading: true, isPlaying: false, timer: TIMER };
  }

  componentDidMount() {
    api.fethApi().then((questions) => {
      this.setState({ questions });
      this.prepareTrivia();
    });
  }

  componentDidUpdate() {
    const { isloading, isPlaying, timer } = this.state;
    if (!isloading && isPlaying) this.startTimer();
    if (timer === 0) {
      this.stopTimer();
      this.disableAnswers();
      this.color();
    }
  }

  prepareTrivia() {
    const { questions } = this.state;
    const formatAnswers = questions.map((answer) => [{
      correct: { value: answer.correct_answer, id: CORRECT },
      incorrect: answer.incorrect_answers.map((incorrect, index) => (
        { value: incorrect, id: `wrong-answer-${index}` }
      )),
    }]);
    const spreadAnswers = formatAnswers.map((answer) => [
      answer[0].correct, ...answer[0].incorrect,
    ]);
    const mixedAnswers = spreadAnswers
      .map((answer) => answer.sort(() => Math.random() - RAND));
    const formatQuestions = questions.map((question, index) => {
      const decodeQuestion = question.question.replaceAll('&amp;', '&')
        .replaceAll('&quot;', '"').replaceAll('&#039;', '\'').replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>');
      const formatObject = {
        category: question.category,
        type: question.category,
        difficulty: question.difficulty,
        question: decodeQuestion,
        answers: mixedAnswers[index],
      }; return formatObject;
    });
    this.setState({ questions: formatQuestions, isLoading: false, isPlaying: true });
  }

  startTimer() {
    this.setState({ isPlaying: false });
    this.gameTimer = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, SECOND);
  }

  resetTimer() {
    this.setState({ timer: TIMER });
    this.startTimer();
  }

  stopTimer() {
    clearInterval(this.gameTimer);
  }

  disableAnswers() {
    const answers = document.querySelectorAll('.btn');
    const next = document.querySelector('.next-container');
    answers.forEach((answer) => { answer.disabled = true; });
    next.style.display = 'flex';
  }

  color() {
    const correct = document.querySelector(`.${CORRECT}`);
    const wrongs = document.querySelectorAll(`.${WRONG}`);
    correct.style.border = '3px solid rgb(6, 240, 15)';
    wrongs.forEach((wrong) => { wrong.style.border = '3px solid rgb(255, 0, 0)'; });
  }

  adjustTimerStyle() {
    document.querySelector('.timer-container').style.backgroundColor = 'transparent';
    const timerAdjust = 'background-color: white; border-radius: 5px; padding: 0.2em;';
    const timerContainer = document.querySelector('.timer');
    timerContainer.style.cssText = timerAdjust;
  }

  submitAnswer({ target: { className } }) {
    const { timer } = this.state;
    this.disableAnswers();
    this.color();
    this.stopTimer();
    if (timer === 0) this.setState({ timer: 'Tempo ESGOTADO!' });
    if (className.split(' ', 2)[1] === CORRECT) {
      // this.calculateScore(timer, id);
      this.setState({ timer: 'ACERTOU!' });
      this.adjustTimerStyle();
    } else {
      this.setState({ timer: 'ERROU!' });
      this.adjustTimerStyle();
    }
  }

  identifyDifficulty(difficultyLevel) {
    switch (difficultyLevel) {
    case 'easy': return EASY;
    case 'medium': return MEDIUM;
    case 'hard': return HARD;
    default: return 0;
    }
  }

  calculateScore(timer, difficultyLevel) {
    const { player: { score }, setUpdateScoreHandler } = this.props;
    const CONST = 10;
    const difficulty = this.identifyDifficulty(difficultyLevel);
    const addToScore = `${score + (CONST + (timer * difficulty))}`;
    setUpdateScoreHandler({ score: addToScore });
    const retrievePlayer = JSON.parse(localStorage.getItem('state'));
    retrievePlayer.player.score = addToScore;
    retrievePlayer.player.assertions += 1;
    localStorage.setItem('state', JSON.stringify(retrievePlayer));
  }

  renderGame() {
    const { questions, timer } = this.state;
    const { player: { name, gravatarEmail, score } } = this.props;
    return (
      <>
        <Header name={ name } gravatar={ gravatarEmail } score={ score } />
        <div className="question-header">
          <div className="question-category-timer">
            <p className="question-category" data-testid="question-category">
              {questions[0].category}
            </p>
            <div className="timer-container">
              <span className="timer">{ timer }</span>
            </div>
          </div>
          <p className="question-text" data-testid="question-text">
            {questions[0].question}
          </p>
        </div>
        <div className="answers-container">
          {questions[0].answers.map((answer, index) => (
            <button
              key={ index }
              id={ questions[0].difficulty }
              className={ ((answer.id === CORRECT)
                ? (`btn ${answer.id}`)
                : `btn ${answer.id.slice(0, ADJUST)}`) }
              type="button"
              data-testid={ answer.id }
              onClick={ this.submitAnswer }
            >
              { answer.value }
            </button>
          ))}
        </div>
      </>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="game-container">
        <div className="game-header">
          <h1 className="title">TRIVIA</h1>
          <div className="next-container">
            <button
              data-testid="btn-next"
              type="button"
              className="next material-icons"
              onClick={ () => console.log('Pŕoxima pergunta') }
            >
              arrow_forward_ios
            </button>
          </div>
        </div>
        {isLoading ? (
          <> </>
        ) : (
          this.renderGame()
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  setUpdateScoreHandler: (scoreInfo) => dispatch(setUpdateScore(scoreInfo)),
});

Game.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  setUpdateScoreHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
