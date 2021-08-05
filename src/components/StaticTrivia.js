import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { questionTest } from '../data';

class StaticTrivia extends Component {
  shuffle(array) {
    let j;
    let x;
    let i;
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }

  shuffledAnswers(question) {
    const { handleClick } = this.props;
    const answersArray = [
      question.incorrect_answers[0],
      question.incorrect_answers[1],
      question.incorrect_answers[2],
      question.correct_answer,
    ];
    let controllIncorrects = 0;
    const answersArrayShuffled = this.shuffle(answersArray);
    return (
      answersArrayShuffled.map((answer, index) => {
        if (answer === question.correct_answer) {
          return (
            <button
              key={ index }
              data-testid="correct-answer"
              className="correct-answer"
              type="button"
              onClick={ handleClick }
              style={ { border: '1px solid black' } }
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
            className="wrong-answer"
            type="button"
            onClick={ handleClick }
            style={ { border: '1px solid black' } }
          >
            { question.incorrect_answers[controllIncorrects - 1] }
          </button>
        );
      })
    );
  }

  render() {
    const { nextQuestion } = this.props;
    return (
      <div>
        <span data-testid="question-category">
          { questionTest.category }
        </span>
        <p data-testid="question-text">
          { questionTest.question }
        </p>
        { this.shuffledAnswers(questionTest) }
        <button
          className="btn-next"
          data-testid="btn-next"
          type="button"
          onClick={ nextQuestion }
          style={ { display: 'none' } }
        >
          Próxima
        </button>
      </div>
    );
  }
}

StaticTrivia.propTypes = {
  handleClick: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default StaticTrivia;
