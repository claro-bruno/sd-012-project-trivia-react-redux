import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {},
      loading: true,
      answers: [],
    };
    this.concatenaAnswers = this.concatenaAnswers.bind(this);
    this.randomize = this.randomize.bind(this);
  }

  async componentDidMount() {
    await this.fetchAPI();
    this.concatenaAnswers();
  }

  componentDidUpdate(prevProps) {
    const { numQuestion } = this.props;
    if (prevProps.numQuestion !== numQuestion) this.concatenaAnswers();
  }

  async fetchAPI() {
    const token = JSON.parse(localStorage.getItem('token'));
    const END_POINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(END_POINT);
    const json = await response.json();
    this.setState({ questions: json, loading: false });
  }

  concatenaAnswers() {
    const { numQuestion } = this.props;
    const { questions: { results } } = this.state;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = results[numQuestion];

    const incorrectObject = incorrectAnswers.map((incorrect, index) => ({
      data: 'wrong-answer', answer: incorrect, id: index,
    }));
    const correctObject = { data: 'correct-answer', answer: correctAnswer };
    const answer = [...incorrectObject, correctObject];
    this.randomize(answer);
  }

  randomize(answer) {
    const numbers = [];
    for (let index = 0; index < 100; index += 1) {
      const number = Math.floor(Math.random() * answer.length);
      if (!numbers.includes(number)) numbers.push(number);
      if (numbers.length === answer.length) break;
    }
    const ordenedAnwsers = numbers.map((number) => answer[number]);
    console.log(ordenedAnwsers, 'randomize');
    this.setState({
      answers: ordenedAnwsers,
    });
  }

  render() {
    const { numQuestion } = this.props;
    const { questions: { results }, loading, answers } = this.state;
    console.log(answers, 'play');
    if (loading) return <div>Loading...</div>;
    return (
      <div>
        <Header />
        <Questions question={ results[numQuestion] } answers={ answers } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numQuestion: state.questions.nextQuestion,
});

export default connect(mapStateToProps)(Play);

Play.propTypes = {
  numQuestion: PropTypes.number,
}.isRequired;
