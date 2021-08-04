import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './question.css';

class Question extends Component {
  render() {
    const {
      question: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
      resolved,
      handleAnswer,
    } = this.props;
    const sortedAnswers = [...incorrectAnswers, correctAnswer].sort();
    return (
      <>
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{ question }</p>
        { sortedAnswers.map((answer, index) => {
          const isCorrect = answer === correctAnswer;
          const dataTestId = isCorrect
            ? 'correct-answer'
            : `wrong-answer-${incorrectAnswers.indexOf(answer)}`;
          const className = isCorrect
            ? 'correct'
            : 'wrong';
          return (
            <button
              className={ resolved ? className : '' }
              type="button"
              key={ index }
              data-testid={ dataTestId }
              onClick={ handleAnswer }
              disabled={ resolved }
            >
              {answer}
            </button>
          );
        })}
      </>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  resolved: PropTypes.bool.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};

export default Question;
