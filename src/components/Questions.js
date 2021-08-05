import React, { Component } from 'react';
import '../styles/Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      borders: false,
      disabled: false,
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

  handleClick() {
    this.setState({ borders: true, disabled: true });
  }

  answersRender() {
    const { questions, disabled, borders } = this.state;
    console.log(questions);
    const question = questions[0];
    const answers = [...question.incorrect_answers, question.correct_answer];
    answers.sort();
    let index = -1;
    return (
      <div>
        <h1 data-testid="question-category">
          {question.category}
        </h1>
        <p data-testid="question-text">
          {question.question}
        </p>
        {answers.map((answer) => {
          if(answer === question.correct_answer) {
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
      </div>
    );
  }

  render() {
    const { questions } = this.state;
    return (
      <>
        { questions[0] &&  this.answersRender() }
      </>
    );
  }
}

export default Questions;
