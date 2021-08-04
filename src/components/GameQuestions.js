import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameQuestions extends Component {
  constructor() {
    super();
    this.state = {
      answered: false,
    };
    this.changeColor = this.changeColor.bind(this);
    this.timeIsOver = this.timeIsOver.bind(this);
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
    const btns = document.querySelectorAll('button');
    btns.forEach((element) => {
      if ((element.id) === 'correct-answer') {
        element.classList.add('correct-btn');
      } else {
        element.classList.add('wrong-btn');
      }
    });
    this.setState({ answered: true });
  }

  timeIsOver() {
    const { time } = this.props;
    if (time === 0) return this.changeColor;
  }

  render() {
    const { questionObj, time } = this.props;
    const
      { category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questionObj;
    const { answered } = this.state;
    return (
      <div>
        {this.timeIsOver()}
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{question}</p>
        {
          this.generateAnswers(correctAnswer, incorrectAnswers)
            .map(({ answer, id }) => (
              <button
                type="button"
                disabled={ time <= 0 }
                data-testid={ id }
                key={ id }
                id={ id }
                onClick={ this.changeColor }
              >
                {answer}
              </button>
            ))
        }
        { answered && <button type="button" data-testid="btn-next">Próximo</button>}
      </div>
    );
  }
}

GameQuestions.propTypes = {
  questionObj: PropTypes.objectOf(Object).isRequired,
  time: PropTypes.number.isRequired,
};

export default GameQuestions;
