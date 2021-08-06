import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';
import { scoreUpdate, updateGlobalKey } from '../redux/actions/questions';
import { nextQuestion } from '../redux/actions/nextQuestion';

class Play extends React.Component {
  constructor(props) {
    super(props);

    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.optionsAnswers = this.optionsAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeBorders = this.changeBorders.bind(this);
    this.takeOffBorder = this.takeOffBorder.bind(this);
    this.saveStorage = this.saveStorage.bind(this);
  }

  componentDidUpdate() {
    const { globalKey } = this.props;
    if (globalKey === false) {
      this.takeOffBorder();
    } else { this.changeBorders(); }
  }

  onClickAnswer() {
    const { changeGlobal } = this.props;
    changeGlobal(true);
  }

  onClickNext() {
    const { changeGlobal, next } = this.props;
    changeGlobal(false);
    next();
  }

  optionsAnswers(answer, index) {
    const { globalKey } = this.props;

    if (answer.data === 'correct-answer') {
      return (
        <button
          id="answerButton"
          type="button"
          key={ index }
          data-testid={ answer.data }
          disabled={ globalKey }
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
        disabled={ globalKey }
        value="wrong"
        onClick={ this.handleClick }
      >
        { answer.answer }
      </button>
    );
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
  }

  takeOffBorder() {
    const answerButtons = document.querySelectorAll('#answerButton');

    answerButtons.forEach(({ style }) => {
      style.border = '1px solid black';
    });
  }

  async handleClick({ target }) {
    let pontosDifficulty;
    const n = { dez: 10, tres: 3, dois: 2, um: 1 };
    const { question: { difficulty }, setScore } = this.props;
    if (difficulty === 'hard') {
      pontosDifficulty = n.tres;
    } else if (difficulty === 'medium') {
      pontosDifficulty = n.dois;
    } else {
      pontosDifficulty = n.um;
    }
    await this.onClickAnswer();
    if (target.value === 'right') setScore(pontosDifficulty);
    this.saveStorage();
  }

  saveStorage() {
    const { name, score, assertions, email } = this.props;
    const player = {
      name,
      assertions,
      score,
      gravatarEmail: email,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  render() {
    const { globalKey, question, answers } = this.props;
    return (
      <div>
        { !globalKey ? <Timer /> : <div>0</div> }
        <div data-testid="question-category">{ question.category }</div>
        <div>{ question.difficulty }</div>
        <div data-testid="question-text">{ question.question }</div>

        { answers.map((answer, index) => this.optionsAnswers(answer, index))}
        <br />
        { globalKey && (
          <button
            type="button"
            onClick={ this.onClickNext }
            data-testid="btn-next"
          >
            proximo
          </button>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  globalKey: state.questions.globalKey,
  name: state.login.name,
  email: state.login.email,
  assertions: state.questions.assertions,
  score: state.questions.score,
  numQuestion: state.questions.numQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  changeGlobal: (status) => dispatch(updateGlobalKey(status)),
  next: () => dispatch(nextQuestion()),
  setScore: (difficulty) => dispatch(scoreUpdate(difficulty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);

Play.propTypes = {
  changeGlobal: PropTypes.func,
}.isRequired;
