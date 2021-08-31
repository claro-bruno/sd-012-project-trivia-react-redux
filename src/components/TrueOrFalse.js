import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const correctAnswer = 'correct-answer';
class TrueOrFalse extends React.Component {
  render() {
    const { question, changeColor, toggleNextButtonVisibility, disabled } = this.props;
    return (
      <>
        <button
          type="button"
          onClick={ (event) => {
            changeColor(event);
            toggleNextButtonVisibility();
          } }
          disabled={ disabled }
          data-testid={
            question.correct_answer === 'True' ? correctAnswer : 'wrong-answer-0'
          }
        >
          VERDADEIRO
        </button>
        <button
          type="button"
          onClick={ (event) => {
            changeColor(event);
            toggleNextButtonVisibility();
          } }
          disabled={ disabled }
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

const mapStateToProps = ({ gameReducer: { question } }) => ({
  question,
});

export default connect(mapStateToProps)(TrueOrFalse);

TrueOrFalse.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
  }),
  disabled: PropTypes.bool,
}.isRequired;
