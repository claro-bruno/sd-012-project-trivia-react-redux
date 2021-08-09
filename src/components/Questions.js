import React, { Component } from 'react';
import '../styles/Questions.css';
import PropTypes from 'prop-types';

const MINUS_ONE = -1;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      score : 0,
      assertions : 0,
      questions: [],
      disabled: false,
      next: false,
      time: 30,
    };
    this.getUnities = this.getUnities.bind(this);
    this.answersRender = this.answersRender.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.countdown = this.countdown.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  componentDidMount() {
    this.getUnities();
    this.countdown();
  }

  setDifficulty() {
    const difficulty = document.querySelector('.difficulty').innerText;
    console.log(difficulty);
    let points = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    if (difficulty === 'easy') points = easy;
    else if (difficulty === 'medium') points = medium;
    else if (difficulty === 'hard') points = hard;
    return points;
  }

  setScore() {
    const { time, score, assertions } = this.state;
    let scoreTotal = score;
    let assertionsTotal = assertions;
    const magicNumber = 10;
    const levelQuestion = this.setDifficulty();
    scoreTotal += magicNumber + (time * levelQuestion);
    assertionsTotal += 1;
    this.setState({
      score: scoreTotal,
      assertions: assertionsTotal,
    }, () => {
      const playerStorage = JSON.parse(localStorage.getItem('state'));
      playerStorage.player.score = scoreTotal;
      playerStorage.player.assertions = assertionsTotal;
      const storeObj = playerStorage;
      localStorage.setItem('state', JSON.stringify(storeObj));
    });
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

  render() {
    const { questions, next, time } = this.state;
    return (
      <main>
        <div className="timer">
          {time}
        </div>
        {questions[0] && this.answersRender()}
        {next && <button data-testid="btn-next" type="button">Proxima Pergunta</button>}
      </main>
    );
  }
}

Questions.propType = {
  score: PropTypes.number,
};

export default Questions;
