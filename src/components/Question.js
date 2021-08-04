import React from 'react';
import { connect } from 'react-redux';
import { shuffleArray, answerCheck } from '../helpers';

class Question extends React.Component {
  render() {
    const { questions, turn } = this.props;
    const { category, type, question, correct_answer, incorrect_answers } = questions[0];
    let answers = [...incorrect_answers, correct_answer];
    shuffleArray(answers);
    return (
      <section>
        <h4 data-testid="question-category">{ category }</h4>
        <p data-testid="question-text">{ question }</p>
        { (type === 'multiple')
          ? answers.map((e, i) => (
            <button
              type="button"
              key={ i }
              data-testid={ answerCheck(correct_answer, e, i) }
            >
              { e }
            </button>)) : <p>V/F</p> }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

export default connect(mapStateToProps, null)(Question);
