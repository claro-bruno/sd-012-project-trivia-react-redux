import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Timer from './Timer';
import { scoreUpdate, updateGlobalKey } from '../redux/actions/questions';
import { nextQuestion } from '../redux/actions/nextQuestion';
import timerZero from '../timer.svg';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectCounter: 0,
      shouldRedirect: false,
    };

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
    const { redirectCounter } = this.state;
    const quatro = 4;
    if (redirectCounter !== quatro) {
      changeGlobal(false);
      next();
      this.setState((prevState) => ({ redirectCounter: prevState.redirectCounter + 1 }));
    } else this.setState({ shouldRedirect: true });
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
          { window.atob(answer.answer) }
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
        { window.atob(answer.answer) }
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
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/feedback" />;
    return (
      <div>
        { !globalKey ? <Timer /> : <img src={ timerZero } alt="Timer Zerado" /> }
        {/* uso do atob() usado conforme a dica do colega Thalles Carneiro e esse link:
        https://developer.mozilla.org/pt-BR/docs/Web/API/WindowOrWorkerGlobalScope/atob */}
        <div data-testid="question-category">{ window.atob(question.category) }</div>
        <div>{ window.atob(question.difficulty) }</div>
        <div data-testid="question-text">{ window.atob(question.question) }</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  changeGlobal: PropTypes.func,
}.isRequired;
