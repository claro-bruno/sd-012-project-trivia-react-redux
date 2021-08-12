import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();
    this.incorrect = this.incorrect.bind(this);
    this.correct = this.correct.bind(this);
  }

  incorrect() {
    const { questions, questionNumber, getScore } = this.props;
    return (
      questions[questionNumber]
        .incorrect_answers.map((answer, index) => (
          <button
            type="button"
            key={ index }
            id="incorrect"
            name="incorrect"
            data-testid={ `wrong-answer-${index}` }
            onClick={ ({ target }) => getScore(target) }
            className="w-answer"
          >
            {answer}
          </button>
        ))
    );
  }

  correct() {
    const { questions, questionNumber, getScore } = this.props;
    return (
      <button
        type="button"
        id={ questions[questionNumber].difficulty }
        name="correct"
        data-testid="correct-answer"
        onClick={ ({ target }) => getScore(target) }
        className="c-answer"
      >
        { questions[questionNumber].correct_answer }
      </button>

    );
  }

  render() {
    return (
      <div className="questions-content">
        { this.incorrect() }
        { this.correct() }
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
