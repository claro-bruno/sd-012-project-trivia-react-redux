import React from 'react';
import PropTypes from 'prop-types';

const correctAnswer = 'correct-answer';
class TrueOrFalse extends React.Component {
  changeColor({ target }) {
    const getButtons = target.parentElement.children;

    for (let index = 0; index < getButtons.length; index += 1) {
      if (getButtons[index].dataset.testid === correctAnswer) {
        getButtons[index].classList.add('correct');
      } else {
        getButtons[index].classList.add('wrong');
      }
    }
  }

  render() {
    const { question } = this.props;
    return (
      <>
        <button
          type="button"
          onClick={ this.changeColor }
          data-testid={
            question.correct_answer === 'True' ? correctAnswer : 'wrong-answer-0'
          }
        >
          VERDADEIRO
        </button>
        <button
          type="button"
          onClick={ this.changeColor }
          data-testid={
            question.correct_answer === 'False' ? correctAnswer : 'wrong-answer-0'
          }
        >
          FALSO
        </button>
      </>
    );
  }
}

export default TrueOrFalse;

TrueOrFalse.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
  }),
}.isRequired;
