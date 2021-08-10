import React, { Component } from 'react';
import '../styles/Questions.css';

const MINUS_ONE = -1;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      disabled: false,
      next: false,
      time: 30,
    };
    this.getUnities = this.getUnities.bind(this);
    this.answersRender = this.answersRender.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.countdown = this.countdown.bind(this);
    this.buttonsGenerator = this.buttonsGenerator.bind(this);
    this.timerGenerator = this.timerGenerator.bind(this);
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
    this.setState({ disabled: true, next: true });
    target.classList.add('selected');
    clearInterval(this.interval);
  }

  buttonsGenerator(index, answer, disabled, next) {
    return (
      <button
        data-testid={ `wrong-answer${index}` }
        id={ `wrong-answer${index}` }
        key={ answer }
        type="button"
        onClick={ this.handleClick }
        disabled={ disabled }
        className={ next ? 'wrong-answer' : 'btn-generic' }
      >
        { answer }
      </button>
    );
  }

  timerGenerator() {
    const { time } = this.state;
    return (
      <div className="w-24 text-center text-2xl">
        {time}
      </div>
    );
  }

  answersRender() {
    const { questions, disabled, next } = this.state;
    const question = questions[0];
    const answers = [...question.incorrect_answers, question.correct_answer];
    answers.sort();
    let index = MINUS_ONE;
    return (
      <>
        <div className="bg-grey rounded-md w-7/12 flex mt-12 p-2 flex-row">
          <div className="bg-header flex flex-col items-center p-2 stopwatch">
            <p data-testid="question-category">
              {question.category}
            </p>
            {this.timerGenerator()}
          </div>
          <h1
            data-testid="questNion-text"
            className="text-center justify-self-center text-xl ml-8"
          >
            {question.question}
          </h1>
        </div>
        <div className="mt-8 grid grid-cols-2">
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
                  className={ next ? 'correct-answer' : 'btn-generic' }
                >
                  { answer }
                </button>
              );
            }
            index += 1;
            return this.buttonsGenerator(index, answer, disabled, next);
          })}
        </div>
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

  render() {
    const { questions, next } = this.state;
    return (
      <main className="flex flex-col items-center">
        {questions[0] && this.answersRender()}
        {next && <button data-testid="btn-next" type="button">Proxima Pergunta</button>}
      </main>
    );
  }
}

export default Questions;
