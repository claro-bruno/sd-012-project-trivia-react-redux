import React from 'react';
import PropTypes from 'prop-types';

const fiftyPercent = 0.5;
const caseTrue = 1;
const caseFalse = -1;
const correctAnswer = 'correct-answer';

class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: this.getAnswers(props.question),
    };
    this.addScore = this.addScore.bind(this);
  }

  getAnswers(question) {
    const answers = [question.correct_answer, ...question.incorrect_answers];

    return answers.sort(() => (Math.random() > fiftyPercent ? caseTrue : caseFalse));
  }

  changeColor({ target }) {
    const getButtons = target.parentElement.children;

    for (let index = 0; index < getButtons.length; index += 1) {
      if (getButtons[index].dataset.testid === correctAnswer) {
        getButtons[index].classList.add('correct');
      } else {
        getButtons[index].classList.add('wrong');
      }
    }
  }

  addScore({ target }) {
    const { setScore } = this.props;
    if (target.dataset.testid === correctAnswer) {
      setScore();
    }
  }

  render() {
    const { question, disabled } = this.props;
    const { answers } = this.state;

    return (
      <>
        {
          answers.map((answer, index) => (
            <button
              key={ index }
              type="button"
              onClick={ (event) => {
                this.changeColor(event);
                this.addScore(event);
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

export default MultipleChoice;

MultipleChoice.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }),
  disabled: PropTypes.bool,
}.isRequired;
