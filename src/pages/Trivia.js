import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BORDER_BLACK } from '../data';
import StaticTrivia from '../components/StaticTrivia';
import Header from '../components/Header';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      timer: 30,
    };
    this.shuffle = this.shuffle.bind(this);
    this.shuffledAnswers = this.shuffledAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  componentDidMount() {
    const second = 1000;
    setInterval(() => this.setState((prevState) => ({
      timer: prevState.timer - 1,
    })), second);
  }

  componentDidUpdate(prevProps, prevState) {
    const { timer } = this.state;
    const correct = document.querySelector('.correct-answer');
    const incorrects = document.querySelectorAll('.wrong-answer');
    const next = document.querySelector('.btn-next');
    correct.style.border = BORDER_BLACK;
    for (let i = 0; i < incorrects.length; i += 1) {
      incorrects[i].style.border = BORDER_BLACK;
    }
    next.style.display = 'none';
    if (timer <= 0) {
      correct.disabled = 'true';
      for (let i = 0; i < incorrects.length; i += 1) {
        incorrects[i].disabled = 'true';
      }
      next.disabled = 'true';
    }
    this.updateTimer(prevState);
  }

  updateTimer(prevState) {
    if (prevState.timer <= 0) {
      this.setState({
        currentQuestion: prevState.currentQuestion + 1,
        timer: 30,
      });
    }
  }

  shuffle(array) {
    let j;
    let x;
    let i;
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }

  shuffledAnswers(question) {
    const answersArray = [
      question.incorrect_answers[0],
      question.incorrect_answers[1],
      question.incorrect_answers[2],
      question.correct_answer,
    ];
    let controllIncorrects = 0;
    const answersArrayShuffled = this.shuffle(answersArray);
    return (
      answersArrayShuffled.map((answer, index) => {
        if (answer === question.correct_answer) {
          return (
            <button
              key={ index }
              data-testid="correct-answer"
              className="correct-answer"
              type="button"
              onClick={ this.handleClick }
              style={ { border: '1px solid black' } }
            >
              { question.correct_answer }
            </button>
          );
        }
        controllIncorrects += 1;
        return (
          <button
            key={ index }
            data-testid={ `wrong-answer-${controllIncorrects - 1}` }
            className="wrong-answer"
            type="button"
            onClick={ this.handleClick }
            style={ { border: '1px solid black' } }
          >
            { question.incorrect_answers[controllIncorrects - 1] }
          </button>
        );
      })
    );
  }

  handleClick() {
    const correct = document.querySelector('.correct-answer');
    const incorrects = document.querySelectorAll('.wrong-answer');
    correct.style.border = '3px solid rgb(6, 240, 15)';
    for (let i = 0; i < incorrects.length; i += 1) {
      incorrects[i].style.border = '3px solid rgb(255, 0, 0)';
    }
    const next = document.querySelector('.btn-next');
    next.style.display = 'block';
  }

  nextQuestion() {
    const maxQuestions = 5;
    this.setState((state) => {
      if (state.currentQuestion < maxQuestions - 1) {
        return {
          currentQuestion: state.currentQuestion + 1,
        };
      }
    });
  }

  render() {
    const { currentQuestion, timer } = this.state;
    const { questions } = this.props;
    if (questions.length === 0) {
      return (
        <div>
          <Header />
          <span>{ timer }</span>
          <StaticTrivia
            handleClick={ this.handleClick }
            nextQuestion={ this.nextQuestion }
          />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <span>{ timer }</span>
        <span data-testid="question-category">
          { questions[currentQuestion].category }
        </span>
        <p data-testid="question-text">
          { questions[currentQuestion].question }
        </p>
        { this.shuffledAnswers(questions[currentQuestion]) }
        <button
          className="btn-next"
          data-testid="btn-next"
          type="button"
          onClick={ this.nextQuestion }
          style={ { display: 'none' } }
        >
          Próxima
        </button>
        <button type="button" data-testid="btn-ranking">
          <Link to="/ranking">Ver Ranking</Link>
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.trivia.questions,
  };
}

Trivia.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Trivia);
