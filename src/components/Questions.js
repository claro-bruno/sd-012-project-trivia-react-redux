import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cronometer from './Cronometer';
import { scoreUpdate, stopTime } from '../redux/actions/questions';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.randomize = this.randomize.bind(this);
    this.optionsAnswer = this.optionsAnswer.bind(this);
    this.changeBorders = this.changeBorders.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.DidMount = this.DidMount.bind(this);
    this.takeOffBorder = this.takeOffBorder.bind(this);
  }

  DidMount(correctAnswer, incorrectAnswers) {
    console.log('concatena');
    const incorrectObject = incorrectAnswers.map((incorrect, index) => ({
      data: 'wrong-answer', answer: incorrect, id: index,
    }));

    const correctObject = { data: 'correct-answer', answer: correctAnswer };
    const answer = [...incorrectObject, correctObject];
    return this.randomize(answer);
  }

  randomize(answer) {
    console.log('randomize');
    const numbers = [];
    for (let index = 0; index < 100; index += 1) {
      const number = Math.floor(Math.random() * answer.length);
      if (!numbers.includes(number)) numbers.push(number);
      if (numbers.length === answer.length) break;
    }
    const ordenedAnwsers = numbers.map((number) => answer[number]);
    // this.setState({
    //   answers: ordenedAnwsers,
    // });
    return ordenedAnwsers;
  }

  optionsAnswer(answer, index) {
    console.log('cria botoes');
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

  changeBorders() {
    console.log('changeBorders');
    const answerButtons = document.querySelectorAll('#answerButton');

    answerButtons.forEach(({ value, style }) => {
      if (value === 'right') {
        style.border = '3px solid rgb(6, 240, 15)';
      } else {
        style.border = '3px solid rgb(255, 0, 0)';
      }
    });
  }

  takeOffBorder() {
    console.log('takeOffBorder');
    const answerButtons = document.querySelectorAll('#answerButton');

    answerButtons.forEach(({ style }) => {
      style.border = '1px solid black';
    });
  }

  async handleClick({ target }) {
    console.log('handleClick das respostas');
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
  }

  render() {
    console.log('render questions');
    const { dataQuestion, nextVisible } = this.props;
    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = dataQuestion;

    if (!nextVisible) this.takeOffBorder();

    const answers = this.DidMount(correctAnswer, incorrectAnswers);

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
  nextVisible: state.questions.nextVisible,
});

const mapDispatchToProps = (dispatch) => ({
  setScore:
    (answerValue, diffucultyValue) => dispatch(scoreUpdate(answerValue, diffucultyValue)),
  setStopTime: () => dispatch(stopTime()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  optionsDisabled: PropTypes.bool,
  name: PropTypes.string,
  assertions: PropTypes.number,
  score: PropTypes.number,
  email: PropTypes.string,
  nextVisible: PropTypes.bool,
  setScore: PropTypes.func,
  setStopTime: PropTypes.func,
  setNextQuestion: PropTypes.func,
}.isRequired;
