import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameQuestions extends Component {
  generateAnswers(correct, incorrect) {
    return [
      {
        answer: correct,
        id: 'correct-answer',
      },
      ...incorrect.map((item, index) => ({
        answer: item, id: `wrong-answer-${index}`,
      })),
    ].sort((a, b) => a.answer.localeCompare(b.answer));
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  }

  render() {
    const { questionObj, nextQuestion, answered, over, onAnswer } = this.props;
    const
      { category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionObj;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{question}</p>
        {
          this.generateAnswers(correctAnswer, incorrectAnswers)
            .map(({ answer, id }) => (
              <button
                type="button"
                data-testid={ id }
                key={ id }
                disabled={ over }
                onClick={ onAnswer }
                style={ answered || over
                  ? {
                    border:
                    `3px solid ${id === 'correct-answer' ? 'rgb(6, 240, 15)' : 'red'}`,
                  }
                  : {} }
              >
                {answer}
              </button>
            ))
        }
        { answered || over
          ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ nextQuestion }
            >
              Próximo
            </button>
          ) : '' }
      </div>
    );
  }
}

GameQuestions.propTypes = {
  questionObj: PropTypes.objectOf(Object).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  over: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  over: state.userInfo.over,
});

export default connect(mapStateToProps)(GameQuestions);
