import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/question.css';

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
      timeCounter,
    } = this.props;
    const sortedAnswers = [...incorrectAnswers, correctAnswer].sort();
    return (
      <section className="main-questions">
        <h2 className="time-counter">
          Time :
          { timeCounter }
        </h2>
        <h2 className="quest-category" data-testid="question-category">{ category }</h2>
        <p data-testid="question-text">{ question }</p>
        { sortedAnswers.map((answer, index) => {
          const isCorrect = answer === correctAnswer;
          const dataTestId = isCorrect
            ? 'correct-answer'
            : `wrong-answer-${incorrectAnswers.indexOf(answer)}`;
          const interruptor = isCorrect
            ? 'correct quest-btn'
            : 'wrong quest-btn';
          return (
            <button
              className={ resolved ? interruptor : 'quest-btn' }
              type="button"
              key={ index }
              data-testid={ dataTestId }
              onClick={ () => handleAnswer(isCorrect) }
              disabled={ resolved }
            >
              {answer}
            </button>
          );
        })}
      </section>
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
  timeCounter: PropTypes.number.isRequired,
};

export default Question;
