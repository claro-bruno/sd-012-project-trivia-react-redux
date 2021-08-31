import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const correctAnswer = 'correct-answer';
class TrueOrFalse extends React.Component {
  constructor() {
    super();
    this.handleClickScore = this.handleClickScore.bind(this);
  }

  handleClickScore(event) {
    const { changeColor, toggleNextButtonVisibility, setScore } = this.props;
    changeColor(event);
    toggleNextButtonVisibility();
    if (event.target.dataset.testid === correctAnswer) setScore();
  }

  render() {
    const { question, disabled } = this.props;
    return (
      <>
        <button
          type="button"
          onClick={ this.handleClickScore }
          disabled={ disabled }
          data-testid={
            question.correct_answer === 'True' ? correctAnswer : 'wrong-answer-0'
          }
        >
          VERDADEIRO
        </button>
        <button
          type="button"
          onClick={ this.handleClickScore }
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
