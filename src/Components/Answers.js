import React from 'react';
import PropTypes from 'prop-types';

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

  answers(question) {
    const answers = [...question.incorrect_answers, question.correct_answer];
    const arrayAnswers = this.shuffleArray(answers);
    const { onClick } = this.props;
    let controllIncorrects = 0;
    return (
      arrayAnswers.map((answer, index) => {
        if (answer === question.correct_answer) {
          return (
            <button
              key={ index }
              type="button"
              data-testid="correct-answer"
              name="correct-answer"
              onClick={ (e) => onClick(e) }
            >
              { question.correct_answer }
            </button>
          );
        }

        controllIncorrects += 1;
        return (
          <button
            key={ index }
            data-testid={ `wrong-answer-${controllIncorrects - 1}` }
            type="button"
            name="wrong-answer"
            onClick={ (e) => onClick(e) }
          >
            { question.incorrect_answers[controllIncorrects - 1] }
          </button>
        );
      })
    );
  }

  render() {
    const { question } = this.props;
    return (
      this.answers(question)
    );
  }
}

Answers.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Answers;
