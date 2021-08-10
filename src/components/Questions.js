import React, { Component } from 'react';
import '../styles/Questions.css';
import { Redirect } from 'react-router-dom';

const MINUS_ONE = -1;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      disabled: false,
      next: false,
      time: 30,
      redirect: false,
    };
    this.getUnities = this.getUnities.bind(this);
    this.answersRender = this.answersRender.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.countdown = this.countdown.bind(this);
    this.buttonFunction = this.buttonFunction.bind(this);
    this.removeFirstQuestion = this.removeFirstQuestion.bind(this);
  }

  componentDidMount() {
    this.getUnities();
    this.countdown();
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
    this.setState({ disabled: true, next: true }, () => target.classList.add('selected'));
    clearInterval(this.interval);
  }

  answersRender() {
    const { questions, disabled, next } = this.state;
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
                className={ next ? 'correct-answer' : '' }
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
              className={ next ? 'wrong-answer' : '' }
            >
              { answer }
            </button>
          );
        })}
      </>
    );
  }

  countdown() {
    const ONE_SECOND = 1000;
    const THIRTY_SECONDS = 30000;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, ONE_SECOND);
    setTimeout(() => {
      clearInterval(this.interval);
      this.setState({
        next: true,
        disabled: true,
      });
    }, THIRTY_SECONDS);
  }

  removeFirstQuestion() {
    const { questions } = this.state;
    const meuArray = [...questions];

    if (meuArray.length > 1) {
      meuArray.shift();
      this.setState({
        next: false,
        questions: meuArray,
        disabled: false,
        time: 30,
      }, () => {
        this.countdown();
      });
    } else {
      this.setState({ redirect: true });
    }
  }

  buttonFunction() {
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ () => this.removeFirstQuestion() }
      >
        Proxima Pergunta
      </button>);
  }

  render() {
    const { questions, next, time, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/feedback" />;
    }
    return (
      <main>
        <div className="timer">
          {time}
        </div>
        {questions[0] && this.answersRender()}
        {next ? this.buttonFunction() : null}
      </main>
    );
  }
}

export default Questions;
