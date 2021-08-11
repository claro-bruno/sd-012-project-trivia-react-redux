import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  actionAssertions, actionDisabled, actionScore, actionTimer } from '../redux/actions';
import ButtonNext from './ButtonNext';
import '../App.css';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      assertions: 0,
      total: 0,
      btnClicked: false,
      nextQuestion: false,
      timer: 30,
    };

    this.createQuestions = this.createQuestions.bind(this);
    this.verifyAns = this.verifyAns.bind(this);
    this.selectedResponse = this.selectedResponse.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.gameInit = this.gameInit.bind(this);
  }

  componentDidMount() {
    this.setTimer();
    this.gameInit();
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
    const { setAssertions } = this.props;
    const state = JSON.parse(localStorage.getItem('state'));
    setAssertions(assertionsValue);
    console.log(scoreValue);
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
    const { index, timer } = this.state;
    const { questions, setScore, setDisabled } = this.props;
    if (target) {
      setDisabled(true);
      if (target.id === 'correct') {
        let result = 0;
        if (questions[index].difficulty === 'easy') {
          result += (ten + (timer * values.easy));
        } else if (questions[index].difficulty === 'medium') {
          result += (ten + (timer * values.medium));
        } else if (questions[index].difficulty === 'hard') {
          result += (ten + (timer * values.hard));
        }
        this.setState((prev) => ({ assertions: prev.assertions + 1,
          total: prev.total + result }), () => {
          const { assertions, total } = this.state;
          setScore(total);
          this.updatePlayer(total, assertions);
        });
      }
    }
  }

  replaceSpecialChars(str) { // remove aspas
    return str.normalize('NFD')
      .replace(/[^a-zA-Zs]/g, ' ');
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

  gameInit() {
    const { setScore } = this.props;
    setScore(0);
    this.setState({ index: 0 });
    const { player } = JSON.parse(localStorage.getItem('state'));
    console.log(player);
    localStorage.setItem('state', JSON.stringify({ player:
      { ...player, score: 0, assertions: 0 } }));
  }

  render() {
    const { index, btnClicked, nextQuestion, timer } = this.state;
    const { questions, isDisabled, setDisabled } = this.props;
    const CORRECT_ANSWER = 'correct-answer';
    if (timer === 0) {
      setDisabled(true);
      clearInterval(this.myInterval);
    }
    if (index > questions.length - 1 && index !== 0) return <Redirect to="/feedback" />;
    const minSec = 10;
    if (!questions.length) return null;
    return (
      <div className="container-question">
        <div>
          <p className="category" data-testid="question-category">
            {questions[index].category}
          </p>
          <span className="cont-questions">{`${index + 1}/${questions.length}`}</span>
          <span testId="header-timer" className={ timer <= minSec ? 'ltTimer' : 'timer' }>
            { timer }
          </span>
          <hr />
          <p className="question" data-testid="question-text">
            {this.replaceSpecialChars(questions[index].question)}
          </p>
        </div>
        <div className="container-btn">
          {this.createQuestions().map((question) => (
            <button
              data-testid={ question.id }
              id={ question.id === CORRECT_ANSWER ? 'correct' : 'incorrect' }
              type="button"
              key={ `${question.id}` }
              disabled={ isDisabled }
              onClick={ this.verifyAns }
              className={ btnClicked || timer === 0
                ? question.ifCorrect
                : 'btn-question' }
            >
              {question.answer}
            </button>
          ))}
        </div>
        { nextQuestion || timer === 0
          ? <ButtonNext testId="btn-next" changeQuestion={ this.changeQuestion } /> : ''}
      </div>
    );
  }
}

Questions.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  setScore: PropTypes.func.isRequired,
  setDisabled: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  setAssertions: PropTypes.func.isRequired,
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
  setAssertions: (assertions) => dispatch(actionAssertions(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
