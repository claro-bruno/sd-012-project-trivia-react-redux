import React from 'react';
import PropTypes from 'prop-types';
import './Answers.css';

class Answers extends React.Component {
  constructor(props) {
    super(props);

    this.shuffleArray = this.shuffleArray.bind(this);
    this.answers = this.answers.bind(this);
  }

  // consultei o StackOverFlow para resolver essa parte
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  answers(question, show, sendShowAnswers) {
    const answers = [...question.incorrect_answers, question.correct_answer];
    const arrayAnswers = this.shuffleArray(answers);
    let controllIncorrects = 0;
    return (
      arrayAnswers.map((answer, index) => {
        if (answer === question.correct_answer) {
          return (
            <button
              key={ index }
              type="button"
              onClick={ () => sendShowAnswers(true) }
              data-testid="correct-answer"
              className={ show ? 'correct answer-btn' : 'answer-btn' }
              name="wrong-answer"
            >
              {question.correct_answer}
            </button>
          );
        }

        controllIncorrects += 1;
        return (
          <button
            key={ index }
            type="button"
            className={ show ? 'wrong answer-btn' : 'answer-btn' }
            onClick={ () => sendShowAnswers(true) }
            data-testid={ `wrong-answer-${controllIncorrects - 1}` }
          >
            {question.incorrect_answers[controllIncorrects - 1]}
          </button>
        );
      })
    );
  }

  render() {
    const { question, show, sendShowAnswers } = this.props;
    return this.answers(question, show, sendShowAnswers);
  }
}

Answers.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired)
      .isRequired,
  }).isRequired,
  sendShowAnswers: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Answers;
