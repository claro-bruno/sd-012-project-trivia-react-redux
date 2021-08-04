import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    if (answer.data === 'correct-answer') {
      return (
        <div
          key={ index }
          data-testid={ answer.data }
        >
          { answer.answer }
        </div>
      );
    }
    return (
      <div key={ index } data-testid={ `wrong-answer${index}` }>{ answer.answer }</div>);
  }

  render() {
    const { loading } = this.state;
    if (loading) return <div>Loading</div>;
    const { questions: { results } } = this.state;
    const { category, question, correct_answer, incorrect_answers } = results[0];
    const answers = this.concatenaAnswers(incorrect_answers, correct_answer);
    return (
      <div>
        <div data-testid="question-category">{ category }</div>
        <div data-testid="question-text">{ question }</div>

        { answers.map((answer, index) => this.optionsAnswer(answer, index)) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

export default connect(mapStateToProps, null)(Questions);

Questions.propTypes = {
  token: PropTypes.string,
}.isRequired;
