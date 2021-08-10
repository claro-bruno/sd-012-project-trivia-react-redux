import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConnectFeedback from '../pages/Feedback';
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
    const { nextQuestion, currentQuestion } = this.props;
    const maxQuestions = 5;
    if (currentQuestion < maxQuestions) {
      return (
        <div>
          <span data-testid="question-category">
            { questionTest[currentQuestion].category }
          </span>
          <p data-testid="question-text">
            { questionTest[currentQuestion].question }
          </p>
          { this.shuffledAnswers(questionTest[currentQuestion]) }
          <button
            className="btn-next"
            data-testid="btn-next"
            type="button"
            onClick={ nextQuestion }
          >
            Próxima
          </button>
          <button type="button" data-testid="btn-play-again">
            <Link to="/">Jogar novamente</Link>
          </button>
          <button type="button" data-testid="btn-ranking">
            <Link to="/ranking">Ver Ranking</Link>
          </button>
        </div>
      );
    }
    return <ConnectFeedback />;
  }
}

StaticTrivia.propTypes = {
  handleClick: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
};

export default StaticTrivia;
