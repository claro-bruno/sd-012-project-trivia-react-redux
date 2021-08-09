import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  render() {
    const { questions, questionNumber, getScore } = this.props;
    return (
      <div>
        { questions[questionNumber]
          .incorrect_answers.map((answer, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ ({ target }) => getScore(target) }
              className="w-answer"
            >
              { answer }
            </button>
          )) }
        <button
          id={ questions[questionNumber].difficulty }
          name="correct"
          type="button"
          data-testid="correct-answer"
          onClick={ ({ target }) => getScore(target) }
          className="c-answer"
        >
          { questions[questionNumber].correct_answer }
        </button>
      </div>
    );
  }
}

Questions.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  getScore: PropTypes.func.isRequired,
};
export default Questions;
