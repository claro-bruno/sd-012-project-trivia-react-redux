import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Timer from '../components/Timer';
import Answers from '../components/Answers';
import { pauseTime } from '../redux/actions/actionTimer';
import { actionPlayer } from '../redux/actions/actionPlayer';
import './Game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      data: '',
      currentQuestion: 0,
      loading: true,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.page = this.page.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.showBtnNextQuestion = this.showBtnNextQuestion.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleAnswers(data) {
    const splitNumber = 0.5;
    const answers = data.results.map((question) => {
      const wrongAnswers = question.incorrect_answers
        .map((option) => ({
          text: option,
          correct: false,
        }));
      const allAnswers = [
        ...wrongAnswers,
        {
          text: question.correct_answer,
          correct: true,
        },
      ];
      return allAnswers
        .sort(() => Math.random() - splitNumber); // código retirado de https://flaviocopes.com/
    });
    return answers;
  }

  async fetchApi() {
    const { token } = this.props;
    const apiUrl = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const answers = this.handleAnswers(data);
      this.setState({
        loading: false,
        data: {
          ...data,
          results: answers.map((answer, index) => ({
            ...data.results[index],
            answers: answer,
          })),
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  handleClickAnswer({ target }) {
    const { pauseTimer, player, name, gravatarEmail } = this.props;
    const incorrectList = document.getElementsByName('incorrect');
    const correctList = document.getElementById('correct');
    incorrectList.forEach((item) => { item.className = 'incorrect'; });
    correctList.className = 'correct';
    const scoreFunc = this.calculateTotalPoints(target);
    const stopTimer = true;
    pauseTimer({ stopTimer });
    player(name, 0, scoreFunc, gravatarEmail);
  }

  calculateTotalPoints({ name }) {
    const { timer } = this.props;
    const BASE_POINT = 10;
    if (name === 'correct') {
      return BASE_POINT + (timer * this.calculateDifficultyPoint());
    }
    return 0;
  }

  calculateDifficultyPoint() {
    const { currentQuestion } = this.state;
    const { data: { results: { [currentQuestion]: { difficulty } } } } = this.state;
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    if (difficulty === 'hard') {
      return HARD;
    }
    if (difficulty === 'medium') {
      return MEDIUM;
    }
    return EASY;
  }

  showBtnNextQuestion() {
    return (
      <button
        type="button"
        data-testid="btn-next"
      >
        Next Question
      </button>
    );
  }

  page() {
    const { data,
      currentQuestion,
    } = this.state;
    const { timeOff } = this.props;
    return (
      <>
        <Header />
        <fieldset>
          <h1
            data-testid="question-category"
          >
            {data.results[currentQuestion].category}
          </h1>
          <Timer />
          <h2
            data-testid="question-text"
          >
            {data.results[currentQuestion].question}
          </h2>
          <Answers
            data={ data }
            currentQuestion={ currentQuestion }
            timeOff={ timeOff }
            handleClickAnswer={ this.handleClickAnswer }
          />
          { timeOff && this.showBtnNextQuestion() }
        </fieldset>
      </>
    );
  }

  pageRender() {
    const { loading } = this.state;
    return loading ? <Loading /> : this.page();
  }

  render() {
    const { name, gravatarEmail, score } = this.props;
    localStorage
      .setItem('state', JSON
        .stringify({ player: { name, assertions: 0, score, gravatarEmail } }));
    const { isLoading } = this.props;
    return isLoading ? <Loading /> : this.pageRender();
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.login.isLoading,
  token: state.login.token,
  name: state.login.name,
  gravatarEmail: state.login.hashEmail,
  timer: state.timerReducer.time,
  timeOff: state.timerReducer.timeOff,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  pauseTimer: (timer) => {
    dispatch(pauseTime(timer));
  },
  player: (name, assertions, score, gravatarEmail) => (
    dispatch(actionPlayer(name, assertions, score, gravatarEmail))),
});

Game.propTypes = {
  isLoading: PropTypes.bool,
  token: PropTypes.string,
  timeOff: PropTypes.bool,
  pauseTimer: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
