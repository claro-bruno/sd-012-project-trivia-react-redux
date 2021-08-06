import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';
import { updateGlobalKey } from '../redux/actions/timer';
import { nextQuestion } from '../redux/actions/nextQuestion';

class Play extends React.Component {
  constructor(props) {
    super(props);

    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.optionsAnswers = this.optionsAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeBorders = this.changeBorders.bind(this);
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

  async handleClick() {
    this.changeBorders();

    // let pontosAnswer = 0;
    // let pontosDiffuculty;
    // const n = { dez: 10, tres: 3, dois: 2, um: 1 };

    // if (target.value === 'right') pontosAnswer = n.dez;

    // const { dataQuestion: { difficulty } } = this.props;
    // if (difficulty === 'hard') {
    //   pontosDiffuculty = n.tres;
    // } else if (difficulty === 'medium') {
    //   pontosDiffuculty = n.dois;
    // } else {
    //   pontosDiffuculty = n.um;
    // }
    this.onClickAnswer();
  }

  render() {
    const { globalKey, question, answers } = this.props;
    console.log(answers, 'a');
    return (
      <div>
        { !globalKey ? <Timer /> : <div>0</div> }
        <div data-testid="question-category">{ question.category }</div>
        <div data-testid="question-text">{ question.question }</div>

        { answers.map((answer, index) => this.optionsAnswers(answer, index))}

        <button type="button" onClick={ this.handleClick }>reposta</button>
        <button type="button" onClick={ this.onClickNext }>proximo</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  globalKey: state.questions.globalKey,
});

const mapDispatchToProps = (dispatch) => ({
  changeGlobal: (status) => dispatch(updateGlobalKey(status)),
  next: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);

Play.propTypes = {
  changeGlobal: PropTypes.func,
}.isRequired;
