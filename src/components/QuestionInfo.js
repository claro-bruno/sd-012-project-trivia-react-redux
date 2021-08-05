import React, { Component } from 'react';

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
    const { questions } = this.props;

    return (

    );
  }
}
