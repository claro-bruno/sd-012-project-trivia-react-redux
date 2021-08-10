import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { scoreUpdate } from '../redux/actions';
import Header from '../components/Header';
import getUserInfo from '../services/api';
import saveLocalStorage from '../helper/saveLocalStorage';
import { guessUpdate } from '../redux/actions/gameActions';
import './game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questionNumber: 0,
      actualQuestion: [],
      timer: 30,
      idTimer: 0,
      showButton: false,
      correctGuess: 0,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.multiple = this.multiple.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleWriteError = this.handleWriteError.bind(this);
    this.timeInterval = this.timeInterval.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleWriteError(text) {
    text = text.replaceAll('&#039;', '\'');
    text = text.replaceAll('&quot;', '"');
    text = text.replaceAll('&rdquo;', '"');
    return text;
  }

  async fetchApi() {
    let tokenTeste = localStorage.getItem('token');
    if (!tokenTeste) {
      const userInfo = await getUserInfo();
      localStorage.setItem('token', userInfo.token);
      tokenTeste = localStorage.getItem('token');
    }
    const { category, difficulty, type } = this.props;
    const linkApi = `https://opentdb.com/api.php?amount=5&token=${tokenTeste}`;
    const apiRequest = `${linkApi}&${category}&${difficulty}&${type}`;
    const res = await fetch(apiRequest);
    const data = await res.json();
    this.setState({
      questions: data.results,
      timer: 30,
    }, () => this.timeInterval());
  }

  handleScore({ target }, { difficulty, correct_answer: correctAnswer }, timer) {
    const { getPoint } = this.props;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const point = 10;
    let difficultyValue;
    switch (difficulty) {
    case 'hard':
      difficultyValue = hard;
      break;
    case 'medium':
      difficultyValue = medium;
      break;
    default:
      difficultyValue = easy;
      break;
    }
    if (target.value === correctAnswer) {
      getPoint(point + (timer * difficultyValue), 1);
      saveLocalStorage();
    }
  }

  checkAnswer(e) {
    const { questionNumber, questions, idTimer, timer, correctGuess } = this.state;
    clearInterval(idTimer);
    const correctAnswer = questions[questionNumber].correct_answer;
    if (e) {
      this.handleScore(e, questions[questionNumber], timer);
      if (e.target.value === correctAnswer) {
        this.setState({ correctGuess: correctGuess + 1 });
      }
    }
    this.setState({ showButton: true });

    const answers = document.querySelectorAll('.alternative-btn');
    answers.forEach((answer) => {
      if (answer.value === correctAnswer) {
        answer.style.border = '3px solid rgb(6, 240, 15)';
        answer.disabled = true;
      } else {
        answer.style.border = '3px solid rgb(255, 0, 0)';
        answer.disabled = true;
      }
    });
  }

  /* https://flaviocopes.com/how-to-shuffle-array-javascript/ Shuffle array, peguei desse link */

  multiple(question) {
    const { actualQuestion } = this.state;
    const range = 0.5;
    let buttonID = '';
    let wrongNumber = 0;
    const possibleAnswers = actualQuestion.length
      ? actualQuestion
      : [...question.incorrect_answers, question.correct_answer]
        .sort(() => Math.random() - range);
    if (!actualQuestion.length) {
      this.setState({ actualQuestion: [...possibleAnswers] });
    }
    const allButtons = possibleAnswers.map((item, index) => {
      if (item === question.correct_answer) {
        buttonID = 'correct-answer';
      } else {
        buttonID = `wrong-answer-${wrongNumber}`;
      }
      const alternativa = this.handleWriteError(item);
      const answer = (
        <button
          className="alternative-btn"
          data-testid={ buttonID }
          onClick={ this.checkAnswer }
          key={ index }
          type="button"
          value={ item }
        >
          { alternativa }
        </button>
      );
      if (buttonID === `wrong-answer-${wrongNumber}`) {
        wrongNumber += 1;
      }
      return answer;
    });
    return allButtons;
  }

  nextQuestion() {
    const { questionNumber, questions, correctGuess } = this.state;
    this.setState({
      showButton: false,
    });
    if (questionNumber + 1 !== questions.length) {
      this.setState({
        questionNumber: questionNumber + 1,
        actualQuestion: [],
        timer: 30,
      }, () => this.timeInterval());
      const answers = document.querySelectorAll('.alternative-btn');
      answers.forEach((answer) => {
        answer.style.border = '1px solid black';
        answer.disabled = false;
      });
    } else {
      // Aqui deve ser a chamada da proxima pagina caso tenha sido a ultima questão.
      const storage = JSON.parse(localStorage.getItem('state'));
      storage.player.assertions = correctGuess;
      localStorage.setItem('state', JSON.stringify(storage));
      const { history, getScore } = this.props;
      getScore(correctGuess);
      history.push('/feedback');
    }
  }

  timeInterval() {
    const { timer } = this.state;
    let time = timer;
    const delay = 1000;
    const timerGame = setInterval(() => {
      if (!(time - 1)) {
        time -= 1;
        clearInterval(timerGame);
        this.checkAnswer();
        return this.setState({ timer: time });
      }
      time -= 1;
      this.setState({ timer: time });
    }, delay);
    this.setState({ idTimer: timerGame });
  }

  render() {
    const { questionNumber, questions, timer, showButton } = this.state;
    const buttonNext = (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Próxima
      </button>
    );
    if (!questions.length) {
      return (<h1>Loading</h1>);
    }
    const actualQuestion = questions[questionNumber];
    let pergunta = actualQuestion.question;
    pergunta = this.handleWriteError(pergunta);
    return (
      <div>
        <Header />
        <div>
          <div>{ timer }</div>
          <h2 data-testid="question-category">{ actualQuestion.category }</h2>
          <h3 data-testid="question-text">{ pergunta }</h3>
          { this.multiple(actualQuestion) }
        </div>
        { showButton && buttonNext }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.settings.category,
  difficulty: state.settings.difficulty,
  type: state.settings.type,
});

const mapDispatchToProps = (dispatch) => ({
  getPoint: (point) => dispatch(scoreUpdate(point)),
  getScore: (state) => dispatch(guessUpdate(state)),
});

Game.propTypes = {
  getPoint: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getScore: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
