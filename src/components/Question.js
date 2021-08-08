import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Answers from './Answers';
import { shuffleArray } from '../helpers';

class Question extends React.Component {
  render() {
    const { questions } = this.props;
    const {
      category,
      question,
      difficulty,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[0];
    const answers = [...incorrectAnswers, correctAnswer];
    shuffleArray(answers);
    return (
      <section>
        <h4 data-testid="question-category">{ category }</h4>
        <p data-testid="question-text">{ question }</p>
        <Answers
          answers={ answers }
          correctAnswer={ correctAnswer }
          difficulty={ difficulty }
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Question);
