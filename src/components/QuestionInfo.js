import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import UniqueButton from './UniqueButton';
import Button from './Button';
import './questioninfo.css';

class QuestionInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    this.changeColorsAnswer = this.changeColorsAnswer.bind(this);
    this.changeButtonVisibility = this.changeButtonVisibility.bind(this);
    this.changeQuestions = this.changeQuestions.bind(this);
    this.resetColors = this.resetColors.bind(this);
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

  changeQuestions() {
    this.setState((p) => ({ index: p.index + 1 }));
  }

  resetColors() {
    const correct = document.getElementById('correct-answer');
    const incorrect = document.getElementsByName('incorrect-answer');
    incorrect.forEach((question) => question.classList.remove('questionWrong'));
    correct.classList.remove('questionCorrect');
  }

  sumUserPoints() {
    const basePoints = 10;
    const { timer, questions } = this.props;
    const { index } = this.state;
    const difficultyMultiplier = () => {
      if (questions[index].difficulty === 'easy') {
        return 1;
      }
      if (questions[index].difficulty === 'medium') {
        return 2;
      }
      if (questions[index].difficulty === 'hard') {
        const hardMultiplier = 3;
        return hardMultiplier;
      }
    };
    const points = basePoints + (timer * difficultyMultiplier());
    const locals = JSON.parse(localStorage.getItem('state'));
    localStorage.setItem('state', JSON.stringify({
      player: { ...locals.player, score: locals.player.score + points },
    }));
  }

  render() {
    const { index } = this.state;
    const { questions, disabled } = this.props;
    const finalQuestion = 5;
    if (index === finalQuestion) return <Redirect to="/feedback" />;
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
        <UniqueButton
          disabled={ disabled }
          className="correct-answer"
          onClick={ () => {
            this.changeButtonVisibility();
            this.changeColorsAnswer();
            this.sumUserPoints();
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
          onClick={ () => {
            this.changeQuestions();
            this.resetColors();
          } }
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
  timer: PropTypes.number.isRequired,
};

QuestionInfo.defaultProps = {
  disabled: false,
};

export default QuestionInfo;
