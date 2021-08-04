import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameQuestions extends Component {
  constructor() {
    super();
    this.changeColor = this.changeColor.bind(this);
  }

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

  changeColor() {
    const { onAnswer } = this.props;
    const btns = document.querySelectorAll('button');
    console.log(btns);
    btns.forEach((element) => {
      if ((element.id) === 'correct-answer') {
        element.classList.add('correct-btn');
      } else {
        element.classList.add('wrong-btn');
      }
    });
    onAnswer();
  }
  // oi

  render() {
    const { questionObj, nextQuestion, answered } = this.props;
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
                onClick={ this.changeColor }
              >
                {answer}
              </button>
            ))
        }
        { answered
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ nextQuestion }
          >
            Próximo
          </button>
        )}
      </div>
    );
  }
}

GameQuestions.propTypes = {
  questionObj: PropTypes.objectOf(Object).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
};

export default GameQuestions;
