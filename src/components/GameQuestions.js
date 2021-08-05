import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const correctAnswerId = 'correct-answer';
class GameQuestions extends Component {
  generateAnswers(correct, incorrect) {
    return [
      {
        answer: correct,
        id: correctAnswerId,
      },
      ...incorrect.map((item, index) => ({
        answer: item, id: `wrong-answer-${index}`,
      })),
    ].sort((a, b) => a.answer.localeCompare(b.answer));
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  }

  questionAnswered({ target: { id } }) {
    const { onAnswer, time, questionObj: { difficulty } } = this.props;
    const defaultPoint = 10;
    const difficultyPoints = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    if (id === correctAnswerId) {
      const state = JSON.parse(localStorage.getItem('state'));
      const newState = {
        player: {
          ...state.player,
          score: state.player.score
              + defaultPoint + (time * difficultyPoints[difficulty]),
          assertions: state.player.assertions + 1,
        },
      };
      localStorage.setItem('state', JSON.stringify(newState));
    }
    onAnswer();
  }

  render() {
    const { questionObj, nextQuestion, answered, over, counter } = this.props;
    const lastQuestion = 5;
    if (counter === lastQuestion) return <Redirect to="/feedback" />;
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
                id={ id }
                disabled={ answered || over }
                onClick={ (e) => this.questionAnswered(e) }
                style={ answered || over
                  ? {
                    border:
                    `3px solid ${id === correctAnswerId ? 'rgb(6, 240, 15)' : 'red'}`,
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
  time: PropTypes.number.isRequired,
  counter: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  over: state.userInfo.over,
  time: state.userInfo.time,
});

export default connect(mapStateToProps)(GameQuestions);
