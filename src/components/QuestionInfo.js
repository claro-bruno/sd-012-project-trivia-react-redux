import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UniqueButton from './UniqueButton';
import Button from './Button';
import './questioninfo.css';

class QuestionInfo extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };

    this.changeColorsAnswer = this.changeColorsAnswer.bind(this);
    this.changeButtonVisibility = this.changeButtonVisibility.bind(this);
  }

  changeButtonVisibility() {
    const buttonNextQuestion = document.getElementsByClassName('btn-next')[0];
    buttonNextQuestion.classList.add('visible');
  }

  changeColorsAnswer() {
    const correct = document.getElementById('correct-answer');
    const incorrect = document.getElementsByName('incorrect-answer');
    incorrect.forEach((question) => { question.className = 'questionWrong'; });
    correct.className = 'questionCorrect';
  }

  render() {
    const { index } = this.state;
    const { questions, disabled } = this.props;

    return (
      <div className="question-container">
        <p className="question-category" data-testid="question-category">
          <span className="category">Category:</span>
          {`${questions[index].category}`}
        </p>
        <p data-testid="question-text" className="question-text">
          <span className="question">Question:</span>
          {`${questions[index].question}`}
        </p>
        {/* Aqui eu resolvi chamar de UniqueButton
        pois ele não compartilha características
        com os botões de resposta errada */}
        <UniqueButton
          disabled={ disabled }
          className="correct-answer"
          onClick={ () => {
            this.changeButtonVisibility();
            this.changeColorsAnswer();
          } }
          innerText={ questions[index].correct_answer }
        />
        {questions[index].incorrect_answers.map((incorrect, i) => (
          <Button
            className="incorrect-answer"
            key={ index }
            dataTestId={ `wrong-answer-${i}` }
            onClick={ () => {
              this.changeButtonVisibility();
              this.changeColorsAnswer();
            } }
            innerText={ incorrect }
          />
        ))}
        <button
          data-testid="btn-next"
          type="button"
          className="btn-next"
        >
          PRÓXIMA
        </button>
      </div>
    );
  }
}

QuestionInfo.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
};

QuestionInfo.defaultProps = {
  disabled: false,
};

export default QuestionInfo;
