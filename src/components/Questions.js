import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { actionDisabled, actionScore, actionTimer } from '../redux/actions';
import fetchToken from '../services/fetchToken';
import ButtonNext from './ButtonNext';
import '../App.css';
import Span from './Span';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      assertions: 0,
      btnClicked: false,
      nextQuestion: false,
      timer: 30,
    };

    this.createQuestions = this.createQuestions.bind(this);
    this.verifyAns = this.verifyAns.bind(this);
    this.selectedResponse = this.selectedResponse.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    const { setTimer } = this.props;
    const second = 1000;
    this.myInterval = setInterval(() => {
      const { timer } = this.state;
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => setTimer(timer));
    }, second);
  }

  selectedResponse() {
    this.setState({
      btnClicked: true,
      nextQuestion: true,
    });
    clearInterval(this.myInterval);
  }

  validateToken() {
    const { getToken } = this.props;
    localStorage.clear();
    fetchToken();
    getToken(localStorage.getItem('token'));
  }

  // Lógica feita com auxílio do meu colega Matheus Figueiredo,
  // onde nos ajudou nos fornecendo a lógica do sort
  createQuestions() {
    const { questions } = this.props;
    const { index } = this.state;
    const CORRECT_ANSWER = 'correct-answer';
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[index];
    return [
      {
        answer: correctAnswer,
        id: CORRECT_ANSWER,
        ifCorrect: CORRECT_ANSWER,
      },
      ...incorrectAnswers.map((item, i) => ({
        answer: item,
        id: `wrong-answer-${i}`,
        ifCorrect: 'wrong-answer',
      })),
    ].sort((a, b) => a.answer.localeCompare(b.answer));
  }

  updatePlayer(scoreValue, assertionsValue) {
    const state = JSON.parse(localStorage.getItem('state'));
    const newState = {
      player: {
        ...state.player,
        score: scoreValue,
        assertions: assertionsValue,
      },
    };
    localStorage.setItem('state', JSON.stringify(newState));
  }

  verifyAns({ target }) {
    this.selectedResponse();
    const ten = 10;
    const values = { easy: 1, medium: 2, hard: 3 };
    const { index } = this.state;
    const { questions, timer, setScore, setDisabled } = this.props;
    let result = 0;
    if (target) {
      setDisabled(true);
      if (target.id === 'correct') {
        if (questions[index].difficulty === 'easy') {
          result += (ten + (timer * values.easy));
        } else if (questions[index].difficulty === 'medium') {
          result += (ten + (timer * values.medium));
        } else if (questions[index].difficulty === 'hard') {
          result += (ten + (timer * values.hard));
        }
        setScore(result);
        this.setState((prev) => ({ assertions: prev.assertions + 1 }), () => {
          const { assertions } = this.state;
          this.updatePlayer(result, assertions);
        });
      }
    }
  }

  changeQuestion() {
    const { setDisabled } = this.props;
    console.log(this.setTimer);
    this.setState((prev) => ({
      index: prev.index + 1,
      btnClicked: false,
      nextQuestion: false,
      timer: 30,
    }), () => this.setTimer());
    setDisabled(false);
  }

  render() {
    const { index, btnClicked, nextQuestion, timer } = this.state;
    const { questions, isDisabled, setDisabled } = this.props;
    const CORRECT_ANSWER = 'correct-answer';
    if (timer === 0) {
      setDisabled(true);
      clearInterval(this.myInterval);
    }
    if (index === questions.length) { return <Redirect to="/feedback" />; }

    return (
      <>
        <div>
          <p data-testid="question-category">{questions[index].category}</p>
          <p data-testid="question-text">{questions[index].question}</p>
          <Span
            textContent={ timer }
            testId="header-timer"
          />
        </div>
        <div>
          {
            this.createQuestions().map((question) => (
              <button
                data-testid={ question.id === CORRECT_ANSWER
                  ? CORRECT_ANSWER
                  : question.id }
                id={ question.id === CORRECT_ANSWER ? 'correct' : 'incorrect' }
                type="button"
                key={ `${question.id}` }
                disabled={ isDisabled }
                onClick={ this.verifyAns }
                className={ btnClicked
                  ? question.ifCorrect
                  : '' }
              >
                {question.answer}
              </button>
            ))
          }
        </div>
        { nextQuestion
        && <ButtonNext testId="btn-next" changeQuestion={ this.changeQuestion } /> }

      </>
    );
  }
}

Questions.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  timer: PropTypes.string.isRequired,
  setScore: PropTypes.func.isRequired,
  setDisabled: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    length: PropTypes.string,
    correctanswer: PropTypes.arrayOf(PropTypes.string),
    incorrectanswer: PropTypes.arrayOf(PropTypes.string),
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isDisabled: state.disabledReducer.isDisabled,
  timer: state.timerReducer.timer,
  score: state.scoreReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  setDisabled: (isDisabled) => dispatch(actionDisabled(isDisabled)),
  setScore: (score) => dispatch(actionScore(score)),
  setTimer: (timer) => dispatch(actionTimer(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
