import React, { Component } from 'react';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
    this.getUnities = this.getUnities.bind(this);
  }

  componentDidMount() {
    this.getUnities();
  }

  async getUnities() {
    const token = localStorage.getItem('token');
    const API_URL = `https://opentdb.com/api.php?amount=5&token${token}`
    const response = await fetch(API_URL);
    const questions = await response.json();

    this.setState(() => ({
      questions: questions.results,
    }));
  }

  incorrectAnswers() {
    const { questions } = this.state;
    const getQuestion = questions[0];
    const selectedQuestion = getQuestion && getQuestion.incorrect_answers;
    return selectedQuestion && selectedQuestion.map((question, index) => (
      <button
        type="button"
        key={ question }
        data-testid={ `wrong-answer-${index}` }
      >
        {question}
      </button>));
  }

  render() {
    const { questions } = this.state;
    const selectedQuestion = questions[0];
    return (
      <div>
        <h1 data-testid="question-category">
          {selectedQuestion && selectedQuestion.category}
        </h1>
        <p data-testid="question-text">
          {selectedQuestion && selectedQuestion.question}
        </p>
        <button data-testid="correct-answer" type="button">
          {selectedQuestion && selectedQuestion.correct_answer}
        </button>
        {this.incorrectAnswers()}
      </div>
    );
  }
}

export default Questions;
