import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameQuestions extends Component {
  generateAnswers(correct, incorrect) {
    return [
      {
        answer: correct,
        id: 'correct-answer',
      },
      ...incorrect.map((item, index) => ({ answer: item, id: `wrong-answer-${index}` })),
    ].sort((a, b) => a.answer.localeCompare(b.answer));
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  }

  render() {
    const { questionObj, time } = this.props;
    const
      { category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionObj;

    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{question}</p>
        {
          this.generateAnswers(correctAnswer, incorrectAnswers)
            .map(({ answer, id }) => (
              <button
                type="button"
                disabled={ time <= 0 }
                data-testid={ id }
                key={ id }
              >
                {answer}
              </button>
            ))
        }
      </div>
    );
  }
}

GameQuestions.propTypes = {
  questionObj: PropTypes.objectOf(Object).isRequired,
  time: PropTypes.number.isRequired,
};

export default GameQuestions;
