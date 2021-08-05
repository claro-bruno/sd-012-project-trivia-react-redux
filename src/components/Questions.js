import React, { Component } from 'react';
import '../styles/Questions.css';

const MINUS_ONE = -1;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      borders: false,
      disabled: false,
      next: false,
    };
    this.getUnities = this.getUnities.bind(this);
    this.answersRender = this.answersRender.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getUnities();
  }

  async getUnities() {
    const token = localStorage.getItem('token');
    const API_URL = `https://opentdb.com/api.php?amount=5&token${token}`;
    const response = await fetch(API_URL);
    const questions = await response.json();

    this.setState(() => ({
      questions: questions.results,
    }));
  }

  handleClick({ target }) {
    this.setState({ borders: true, disabled: true, next: true });
    if (target.id === 'correct-answer') target.style.backgroundColor = 'rgb(6, 240, 15)';
    else target.style.backgroundColor = 'rgb(255, 0, 0)';
  }

  answersRender() {
    const { questions, disabled, borders } = this.state;
    console.log(questions);
    const question = questions[0];
    const answers = [...question.incorrect_answers, question.correct_answer];
    answers.sort();
    let index = MINUS_ONE;
    return (
      <>
        <h1 data-testid="question-category">
          {question.category}
        </h1>
        <p data-testid="question-text">
          {question.question}
        </p>
        {answers.map((answer) => {
          if (answer === question.correct_answer) {
            return (
              <button
                data-testid="correct-answer"
                id="correct-answer"
                type="button"
                key={ answer }
                onClick={ this.handleClick }
                disabled={ disabled }
                className={ borders ? 'correct-answer' : '' }
              >
                { answer }
              </button>
            );
          }
          index += 1;
          return (
            <button
              data-testid={ `wrong-answer${index}` }
              id={ `wrong-answer${index}` }
              key={ answer }
              type="button"
              onClick={ this.handleClick }
              disabled={ disabled }
              className={ borders ? 'wrong-answer' : '' }
            >
              { answer }
            </button>
          );
        })}
      </>
    );
  }

  render() {
    const { questions, next } = this.state;
    return (
      <main>
        {questions[0] && this.answersRender()}
        {next && <button data-testid="btn-next" type="button">Proxima Pergunta</button>}
      </main>
    );
  }
}

export default Questions;
