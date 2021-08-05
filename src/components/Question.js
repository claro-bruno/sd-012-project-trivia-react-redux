import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UniqueButton from './UniqueButton';
import Button from './Button';
import './question.css';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };

    this.changeColorsAnswer = this.changeColorsAnswer.bind(this);
  }

  changeColorsAnswer() {
    const correct = document.getElementById('correct-answer');
    const incorrect = document.getElementsByName('incorrect-answer');
    const buttonNextQuestion = document.getElementsByClassName('btn-next')[0];
    incorrect.forEach((question) => { question.className = 'questionWrong'; });
    correct.className = 'questionCorrect';
    buttonNextQuestion.classList.add('visible');
  }

  render() {
    const { index } = this.state;
    const { questions } = this.props;
    return (
      <div>
        { !questions.length
          ? null
          : (
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
                className="correct-answer"
                onClick={ this.changeColorsAnswer }
                innerText={ questions[index].correct_answer }
              />
              {questions[index].incorrect_answers.map((incorrect, i) => (
                <Button
                  className="incorrect-answer"
                  key={ index }
                  dataTestId={ `wrong-answer-${i}` }
                  onClick={ this.changeColorsAnswer }
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
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Question);
