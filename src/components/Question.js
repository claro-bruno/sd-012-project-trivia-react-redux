import React from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';

class Question extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <div>
        <p data-testid="question-category">
          { question.category }
        </p>
        <h3 data-testid="question-text">
          { question.question }
        </h3>
        <Answers question={ question } />
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  }).isRequired,
};

export default Question;
