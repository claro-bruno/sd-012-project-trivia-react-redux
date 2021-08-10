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
        { data.results[currentQuestion].answers
          .map(((answer, index) => {
            const { correct } = answer;
            return (
              <li key={ index }>
                <button
                  data-testid={ correct ? 'correct-answer' : `wrong-answer-${index}` }
                  type="button"
                  onClick={ handleClickAnswer }
                  name={ correct ? 'correct' : 'incorrect' }
                  id={ correct ? 'correct' : 'incorrect' }
                  disabled={ timeOff }
                >
                  { answer.text }
                </button>
              </li>
            );
          })) }
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
