import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cronometer from './Cronometer';
import './styles/Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.concatenaAnswers = this.concatenaAnswers.bind(this);
    this.randomize = this.randomize.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const token = JSON.parse(localStorage.getItem('token'));
    const END_POINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(END_POINT);
    const json = await response.json();
    this.setState({ questions: json, loading: false });
  }

  concatenaAnswers(incorrects, correct) {
    const incorrectObject = incorrects.map((incorrect, index) => ({
      data: 'wrong-answer', answer: incorrect, id: index,
    }));
    const correctObject = { data: 'correct-answer', answer: correct };
    const answer = [...incorrectObject, correctObject];
    return this.randomize(answer);
  }

  randomize(answer) {
    const numbers = [];
    for (let j = 0; j < 100; j += 1) {
      const number = Math.floor(Math.random() * answer.length);
      if (!numbers.includes(number)) numbers.push(number);
      if (numbers.length === answer.length) break;
    }
    return numbers.map((number) => answer[number]);
  }

  optionsAnswer(answer, index) {
    const { optionsDisabled } = this.props;

    if (answer.data === 'correct-answer') {
      return (
        <button
          id="questionButton"
          type="button"
          key={ index }
          data-testid={ answer.data }
          disabled={ optionsDisabled }
          value="right"
          onClick={ this.handleClick }
        >
          { answer.answer }
        </button>
      );
    }
    return (
      <button
        id="questionButton"
        type="button"
        key={ index }
        data-testid={ `wrong-answer${index}` }
        disabled={ optionsDisabled }
        value="wrong"
        onClick={ this.handleClick }
      >
        { answer.answer }
      </button>);
  }

  handleClick() {
    const buttons = document.querySelectorAll('#questionButton');

    buttons.forEach(({ value, style }) => {
      if (value === 'right') {
        style.border = '3px solid rgb(6, 240, 15)';
      } else {
        style.border = '3px solid rgb(255, 0, 0)';
      }
    });
  }

  render() {
    const { loading } = this.state;
    if (loading) return <div>Loading</div>;
    const { questions: { results } } = this.state;
    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = results[0];
    const answers = this.concatenaAnswers(incorrectAnswers, correctAnswer);
    return (
      <div>
        <Cronometer />
        <div data-testid="question-category">{ category }</div>
        <div data-testid="question-text">{ question }</div>

        { answers.map((answer, index) => this.optionsAnswer(answer, index)) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  optionsDisabled: state.questions.optionsDisabled,
});

export default connect(mapStateToProps, null)(Questions);

Questions.propTypes = {
  token: PropTypes.string,
}.isRequired;
