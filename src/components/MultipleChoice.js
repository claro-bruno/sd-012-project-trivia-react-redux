import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const fiftyPercent = 0.5;
const caseTrue = 1;
const caseFalse = -1;
const correctAnswer = 'correct-answer';

class MultipleChoice extends React.Component {
  constructor() {
    super();

    this.addScore = this.addScore.bind(this);
  }

  getAnswers() {
    const { question } = this.props;
    const answers = [question.correct_answer, ...question.incorrect_answers];

    return answers.sort(() => (Math.random() > fiftyPercent ? caseTrue : caseFalse));
  }

  addScore({ target }) {
    const { setScore } = this.props;
    if (target.dataset.testid === correctAnswer) {
      setScore();
    }
  }

  render() {
    const { question, changeColor, toggleNextButtonVisibility, disabled } = this.props;

    return (
      <>
        {
          this.getAnswers().map((answer, index) => (
            <button
              key={ index }
              type="button"
              onClick={ (event) => {
                changeColor(event);
                this.addScore(event);
                toggleNextButtonVisibility();
              } }
              disabled={ disabled }
              data-testid={
                question.incorrect_answers.includes(answer)
                  ? `wrong-answer-${question.incorrect_answers.indexOf(answer)}`
                  : correctAnswer
              }
            >
              { answer }
            </button>
          ))
        }
      </>
    );
  }
}

const mapStateToProps = ({ gameReducer: { question } }) => ({
  question,
});

export default connect(mapStateToProps)(MultipleChoice);

MultipleChoice.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }),
  disabled: PropTypes.bool,
}.isRequired;
