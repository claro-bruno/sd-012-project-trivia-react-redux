import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import { answerCheck, classChanger } from '../helpers';

class Answers extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.disableAnswer = this.disableAnswer.bind(this);
    this.state = {
      click: false,
      disableBtn: false,
    };
  }

  handleClick() {
    const { click } = this.state;
    if (!click) {
      this.setState({
        click: true,
      });
    }
  }

  disableAnswer() {
    this.setState({
      disableBtn: true,
      click: true,
    });
  }

  render() {
    const { answers, correctAnswer } = this.props;
    const { click, disableBtn } = this.state;
    return (
      <section className="btnSection">
        <Timer disableAnswer={ this.disableAnswer } />
        { answers.map((e, i) => (
          <button
            type="button"
            className={ classChanger(correctAnswer, e, click) }
            key={ i }
            data-testid={ answerCheck(correctAnswer, e, i) }
            onClick={ this.handleClick }
            disabled={ disableBtn }
          >
            { e }
          </button>)) }
      </section>
    );
  }
}

Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
};

export default Answers;
