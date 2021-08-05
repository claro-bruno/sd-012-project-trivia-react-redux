import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cronometer from './Cronometer';
import { scoreUpdate, stopTime } from '../redux/actions/questions';
import { nextQuestion } from '../redux/actions/nextQuestion';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: ['initial state'],
    };

    // this.concatenaAnswers = this.concatenaAnswers.bind(this);
    this.randomize = this.randomize.bind(this);
    this.optionsAnswer = this.optionsAnswer.bind(this);
    this.saveStoragePlayer = this.saveStoragePlayer.bind(this);
    this.changeBorders = this.changeBorders.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dataQuestion } = this.props;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = dataQuestion;

    const incorrectObject = incorrectAnswers.map((incorrect, index) => ({
      data: 'wrong-answer', answer: incorrect, id: index,
    }));

    this.saveStoragePlayer();

    const correctObject = { data: 'correct-answer', answer: correctAnswer };
    const answer = [...incorrectObject, correctObject];
    this.randomize(answer);
  }

  randomize(answer) {
    const numbers = [];
    for (let index = 0; index < 100; index += 1) {
      const number = Math.floor(Math.random() * answer.length);
      if (!numbers.includes(number)) numbers.push(number);
      if (numbers.length === answer.length) break;
    }
    const ordenedAnwsers = numbers.map((number) => answer[number]);
    this.setState({
      answers: ordenedAnwsers,
    });
  }

  optionsAnswer(answer, index) {
    const { optionsDisabled } = this.props;

    if (answer.data === 'correct-answer') {
      return (
        <button
          id="answerButton"
          type="button"
          key={ index }
          data-testid={ answer.data }
          disabled={ optionsDisabled }
          value="right"
          onClick={ this.handleClick }
        >
          { answer.answer }
        </button>
      );
    }
    return (
      <button
        id="answerButton"
        type="button"
        key={ index }
        data-testid={ `wrong-answer${index}` }
        disabled={ optionsDisabled }
        value="wrong"
        onClick={ this.handleClick }
      >
        { answer.answer }
      </button>);
  }

  saveStoragePlayer() {
    const { name, assertions, score, email } = this.props;

    // const players = JSON.parse(localStorage.getItem('state'));
    const player = {
      name,
      assertions,
      score,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  changeBorders() {
    const answerButtons = document.querySelectorAll('#answerButton');

    answerButtons.forEach(({ value, style }) => {
      if (value === 'right') {
        style.border = '3px solid rgb(6, 240, 15)';
      } else {
        style.border = '3px solid rgb(255, 0, 0)';
      }
    });

    // const { setNextQuestion } = this.props;
    // setNextQuestion(true);
  }

  async handleClick({ target }) {
    this.changeBorders();

    let pontosAnswer = 0;
    let pontosDiffuculty;
    const n = { dez: 10, tres: 3, dois: 2, um: 1 };

    if (target.value === 'right') pontosAnswer = n.dez;

    const { dataQuestion: { difficulty } } = this.props;
    if (difficulty === 'hard') {
      pontosDiffuculty = n.tres;
    } else if (difficulty === 'medium') {
      pontosDiffuculty = n.dois;
    } else {
      pontosDiffuculty = n.um;
    }

    const { setScore, setStopTime } = this.props;
    await setStopTime();
    if (pontosAnswer === n.dez) {
      await setScore(pontosAnswer, pontosDiffuculty);
    }
    this.saveStoragePlayer();
  }

  render() {
    const { dataQuestion: { category, question } } = this.props;
    const { answers } = this.state;
    return (
      <div>
        <Cronometer />
        <div data-testid="question-category">{ category }</div>
        <div data-testid="question-text">{ question }</div>

        { answers.map((answer, index) => this.optionsAnswer(answer, index)) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  optionsDisabled: state.questions.optionsDisabled,
  name: state.login.name,
  assertions: state.questions.assertions,
  score: state.questions.score,
  email: state.login.email,
});

const mapDispatchToProps = (dispatch) => ({
  setScore:
    (answerValue, diffucultyValue) => dispatch(scoreUpdate(answerValue, diffucultyValue)),
  setStopTime: () => dispatch(stopTime()),
  setNextQuestion: (status) => dispatch(nextQuestion(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  optionsDisabled: PropTypes.bool,
  name: PropTypes.string,
  assertions: PropTypes.number,
  score: PropTypes.number,
  email: PropTypes.string,
  setScore: PropTypes.func,
  setStopTime: PropTypes.func,
  setNextQuestion: PropTypes.func,
}.isRequired;
