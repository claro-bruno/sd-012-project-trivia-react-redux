import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ActualQuestion extends Component {
  booleanQuestions(answers, correctAnswer) {
    return answers.map((answer) => {
      if (answer === correctAnswer) {
        return (
          <button key={ answer } type="button" data-testid="correct-answer">
            { answer }
          </button>
        );
      }
      return (
        <button key={ answer } type="button" data-testid="wrong-answer-0">
          { answer }
        </button>
      );
    });
  }

  multipleQuestions(answers, correctAnswer) {
    let index = 0;
    return answers.map((answer) => {
      if (answer === correctAnswer) {
        return (
          <button key={ answer } type="button" data-testid="correct-answer">
            { answer }
          </button>
        );
      }
      index += index !== 0 ? 1 : 0;
      return (
        <button key={ answer } type="button" data-testid={ `wrong-answer-${index}` }>
          { answer }
        </button>
      );
    });
  }

  render() {
    const { question: {
      category,
      question,
      type,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.props;

    const answers = [...incorrectAnswers, correctAnswer];
    answers.sort();

    return (
      <section>
        <h2 data-testid="question-category">{ category }</h2>
        <p data-testid="question-text">{ question }</p>
        { type === 'boolean'
          ? (
            <div>
              { this.booleanQuestions(answers, correctAnswer) }
            </div>
          ) : (
            <div>
              { this.multipleQuestions(answers, correctAnswer) }
            </div>
          ) }
      </section>
    );
  }
}

ActualQuestion.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ActualQuestion;
