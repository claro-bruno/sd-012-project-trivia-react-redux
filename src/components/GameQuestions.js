import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonNext from './ButtonNext';
import { changeClass, userScore } from '../redux/actions';
import './GameQuestions.css';

class GameQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedAnswers: [],
      timer: 30,
      timerIntervalID: 0,
      canDisable: true,
      disableAnswers: false,
      nextButton: false,
    };

    this.getQuestion = this.getQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.disableAnswers = this.disableAnswers.bind(this);
  }

  componentDidMount() {
    this.setAnswers();
    this.setTimer();
  }

  componentDidUpdate() {
    const { timer, timerIntervalID } = this.state;
    if (timer <= 0) {
      clearInterval(timerIntervalID);
      this.disableAnswers();
    }
  }

  getQuestion() {
    this.setState({}, () => this.setAnswers());
  }

  setAnswers() {
    const { question } = this.props;
    const incorrectAnswers = question.incorrect_answers.map((answer) => ({
      answer: window.atob(answer),
      isCorrect: false,
      id: Math.random(),
    }));
    const answers = [
      {
        answer: window.atob(question.correct_answer),
        isCorrect: true,
        id: Math.random(),
      },
      ...incorrectAnswers,
    ];

    const sortedAnswers = answers.sort((a, b) => a.id - b.id);
    this.setState({ sortedAnswers });
  }

  setTimer() {
    this.setState({
      timer: 30,
      disableAnswers: false,
      canDisable: true,
      nextButton: false,
    });
    const timerStep = 1000;

    const timerIntervalID = setInterval(() => {
      this.setState((previousState) => ({ timer: previousState.timer - 1 }));
    }, timerStep);

    this.setState({ timerIntervalID });
  }

  timeoutQuestion() {
    const { showAnswer } = this.props;
    showAnswer('answer-btn-correct', 'answer-btn-wrong', 1);
  }

  disableAnswers() {
    const { canDisable } = this.state;
    if (canDisable) {
      this.setState({ disableAnswers: true, canDisable: false, nextButton: true });
      this.timeoutQuestion();
    }
  }

  scoreCalc(difficulty, timer) {
    const state = JSON.parse(localStorage.getItem('state'));
    let playerScore = state.player.score;
    let diff = 0;
    const ten = 10;
    const three = 3;
    switch (difficulty) {
    case 'hard':
      diff = three;
      break;
    case 'medium':
      diff = 2;
      break;
    default:
      diff = 1;
    }
    const point = ten + (diff * timer);
    playerScore += point;
    this.updatePlayer(playerScore);
  }

  updatePlayer(scoreValue) {
    const { updateScore } = this.props;
    const state = JSON.parse(localStorage.getItem('state'));
    const newState = {
      player: {
        ...state.player,
        score: scoreValue,
      },
    };
    localStorage.setItem('state', JSON.stringify(newState));
    updateScore(scoreValue);
  }

  handleClick(answerStatus) {
    this.disableAnswers();
    const { showAnswer } = this.props;
    showAnswer('answer-btn-correct', 'answer-btn-wrong', 0);
    this.setState({
      nextButton: true,
    });

    if (answerStatus === 'correct') {
      const state = JSON.parse(localStorage.getItem('state'));
      const newState = {
        player: {
          ...state.player,
          assertions: state.player.assertions + 1,
        },
      };
      localStorage.setItem('state', JSON.stringify(newState));
    }
  }

  renderQuestions() {
    const { disableAnswers, sortedAnswers, difficulty, timer } = this.state;
    const { cBtnClass, wBtnClass, question } = this.props;
    const answers = sortedAnswers;
    return (
      <div className="questions-card">
        <div className="questions-text">
          <span className="cat" data-testid="question-category">
            {window.atob(question.category)}
          </span>
          <span data-testid="question-text">{window.atob(question.question)}</span>
        </div>
        <div className="questions-answers">
          {answers.map((answer, index) => {
            if (answer.isCorrect) {
              return (
                <button
                  className={ cBtnClass }
                  key={ index }
                  data-testid="correct-answer"
                  type="button"
                  disabled={ disableAnswers }
                  onClick={ () => {
                    this.handleClick('correct');
                    this.scoreCalc(difficulty, timer);
                  } }
                >
                  { answer.answer }
                </button>
              );
            }
            return (
              <button
                className={ wBtnClass }
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                type="button"
                disabled={ disableAnswers }
                onClick={ () => {
                  this.handleClick('wrong');
                } }
              >
                { answer.answer }
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const { timer, nextButton, timerIntervalID } = this.state;

    return (
      <div className="questions-container">
        { this.renderQuestions()}
        <div>
          <p>{ `⌛ ${timer} s` }</p>
          {nextButton && <ButtonNext
            getQuestion={ this.getQuestion }
            setTimer={ this.setTimer }
            timerIntervalID={ timerIntervalID }
          />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  questionNumber: state.game.questionNumber,
  cBtnClass: state.game.cBtnClass,
  wBtnClass: state.game.wBtnClass,
  question: state.game.question,
});

const mapDispatchToProps = (dispatch) => ({
  showAnswer: (correct, wrong, num) => dispatch(changeClass(correct, wrong, num)),
  updateScore: (score) => dispatch(userScore(score)),
});

GameQuestions.propTypes = {
  showAnswer: PropTypes.func.isRequired,
  cBtnClass: PropTypes.string.isRequired,
  wBtnClass: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired,
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
