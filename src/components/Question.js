import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const {
      question: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
    } = this.props
    const sortedAnswers = [...incorrectAnswers,correctAnswer].sort();
    return (
      <>
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{ question }</p>
        { sortedAnswers.map((answer) => {
          const dataTestId = answer === correctAnswer
            ? 'correct-answer'
            : `wrong-answer-${incorrectAnswers.indexOf(answer)}`;
          return (<button data-testid={dataTestId}>{answer}</button>);
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
  }),
};

export default Question;