import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cronometer from './Cronometer';
import { sendAnswer, stopTime } from '../redux/actions/questions';

const CORRECT_ANSWER = 'correct-answer';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
      contador: 0,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.concatenaAnswers = this.concatenaAnswers.bind(this);
    this.randomize = this.randomize.bind(this);
    this.saveStoragePlayer = this.saveStoragePlayer.bind(this);
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
    const correctObject = { data: CORRECT_ANSWER, answer: correct };
    const answer = [...incorrectObject, correctObject];
    return this.randomize(answer);
  }

  randomize(answer) {
    const numbers = [];
    while (numbers.length !== answer.length) {
      const number = Math.floor(Math.random() * answer.length);
      if (!numbers.includes(number)) numbers.push(number);
    }
    return numbers.map((number) => answer[number]);
  }

  async enviaResposta(answer, difficulty) {
    let pontosAnswer = 0;
    let pontosDiffuculty;
    const n = { dez: 10, tres: 3, dois: 2, um: 1 };
    if (answer.data === CORRECT_ANSWER) pontosAnswer = n.dez;
    if (difficulty === 'hard') {
      pontosDiffuculty = n.tres;
    } else if (difficulty === 'medium') {
      pontosDiffuculty = n.dois;
    } else {
      pontosDiffuculty = n.um;
    }
    const { sAnswer, sTime } = this.props;
    await sTime();
    if (pontosAnswer === n.dez) {
      sAnswer(pontosAnswer, pontosDiffuculty);
      this.setState((prevState) => ({ contador: prevState.contador + 1 }));
    }
    this.saveStoragePlayer();
  }

  saveStoragePlayer() {
    const { name, email, score } = this.props;
    const { contador } = this.state;
    const player = {
      player: {
        name,
        assertions: contador,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
    const now = JSON.parse(localStorage.getItem('state'));
    console.log(now);
  }

  optionsAnswer(answer, index, difficulty) {
    const { optionsDisabled } = this.props;
    if (answer.data === CORRECT_ANSWER) {
      return (
        <button
          type="button"
          key={ index }
          onClick={ () => this.enviaResposta(answer, difficulty) }
          data-testid={ answer.data }
          disabled={ optionsDisabled }
        >
          { answer.answer }
        </button>
      );
    }
    return (
      <button
        type="button"
        key={ index }
        onClick={ () => this.enviaResposta(answer, difficulty) }
        data-testid={ `wrong-answer${answer.id}` }
        disabled={ optionsDisabled }
      >
        { answer.answer }
      </button>);
  }

  render() {
    const { loading } = this.state;
    if (loading) return <div>Loading</div>;
    const { questions: { results } } = this.state;
    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers, difficulty } = results[0];
    const answers = this.concatenaAnswers(incorrectAnswers, correctAnswer);
    return (
      <div>
        <Cronometer />
        <div data-testid="question-category">{ category }</div>
        <div data-testid="question-text">{ question }</div>

        { answers.map((answer, index) => this.optionsAnswer(answer, index, difficulty)) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  optionsDisabled: state.questions.optionsDisabled,
  name: state.login.name,
  email: state.login.email,
  score: state.questions.score,
});

const mapDispatchToProps = (dispatch) => ({
  sAnswer: (pAnswer, pDiffuculty) => dispatch(sendAnswer(pAnswer, pDiffuculty)),
  sTime: () => dispatch(stopTime()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  token: PropTypes.string,
}.isRequired;
