import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answers extends Component {
  render() {
    const {
      data,
      currentQuestion,
      timeOff,
      handleClickAnswer,
    } = this.props;
    return (
      <ol>
        { data.results[currentQuestion].incorrect_answers
          .map(((answer, index) => (
            <li key={ index }>
              <button
                data-testid={ `wrong-answer-${index}` }
                type="button"
                onClick={ handleClickAnswer }
                name="incorrect"
                disabled={ timeOff }
              >
                { answer }
              </button>
            </li>
          ))) }
        <li>
          <button
            type="button"
            data-testid="correct-answer"
            id="correct"
            onClick={ handleClickAnswer }
            disabled={ timeOff }
          >
            {data.results[currentQuestion].correct_answer}
          </button>
        </li>
      </ol>
    );
  }
}

Answers.propTypes = {
  data: PropTypes.shape({
    response_code: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  timeOff: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  handleClickAnswer: PropTypes.func.isRequired,
};

export default Answers;
