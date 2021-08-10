import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Answers from '../components/Answers';
import { pauseTime, noTime } from '../redux/actions/actionTimer';
import { actionPlayer } from '../redux/actions/actionPlayer';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      currentQuestion: 0,
      rightQuestions: 0,
      loading: true,
      timer: 30,
      pauseTimer: false,
    };
    this.fetchApi = this.fetchApi.bind(this);
    this.page = this.page.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.showBtnNextQuestion = this.showBtnNextQuestion.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
    this.updateTimer();
  }

  updateTimer() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(
      () => this.setState((previousTime) => ({ timer: previousTime.timer - 1 }), () => {
        const { timer, pauseTimer } = this.state;
        const { changeTimer } = this.props;
        const maximumTime = 0;
        let timeOff = false;
        if (timer === maximumTime || pauseTimer) {
          clearInterval(this.interval);
          timeOff = true;
        }
        changeTimer({ timer, timeOff });
      }),
      ONE_SECOND,
    );
  }

  handleAnswers(data) {
    const splitNumber = 0.5;
    const answers = data.results.map((question) => {
      const wrongAnswers = question.incorrect_answers.map((option) => ({
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
      return allAnswers.sort(() => Math.random() - splitNumber); // código retirado de https://flaviocopes.com/
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
    } catch (error) { return error; }
  }

  handleClickAnswer({ target }) {
    const { rightQuestions } = this.state;
    let assertions = rightQuestions;
    const { player, name, gravatarEmail, changeTimer } = this.props;
    const incorrectList = document.getElementsByName('incorrect');
    const correctList = document.getElementById('correct');
    incorrectList.forEach((item) => { item.className = 'incorrect'; });
    correctList.className = 'correct';
    const scoreFunc = this.calculateTotalPoints(target);
    this.setState({ pauseTimer: true });
    const timeOff = true;
    changeTimer({ timeOff });
    if (target.id === 'correct') {
      assertions += 1;
      this.setState({ rightQuestions: rightQuestions + 1 });
    }
    player(name, assertions, scoreFunc, gravatarEmail);
  }

  calculateTotalPoints({ name }) {
    const { timer } = this.state;
    const BASE_POINT = 10;
    if (name === 'correct') return BASE_POINT + (timer * this.calculateDifficultyPoint());
    return 0;
  }

  calculateDifficultyPoint() {
    const { currentQuestion } = this.state;
    const { data: { results: { [currentQuestion]: { difficulty } } } } = this.state;
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    if (difficulty === 'hard') return HARD;
    if (difficulty === 'medium') return MEDIUM;
    return EASY;
  }

  handleNextQuestion() {
    const { changeTimer } = this.props;
    const { currentQuestion } = this.state;
    const incorrectList = document.getElementsByName('incorrect');
    const correctList = document.getElementById('correct');
    incorrectList.forEach((item) => { item.classList.remove('incorrect'); });
    correctList.classList.remove('correct');
    const timeOff = false;
    changeTimer({ timeOff });
    // const lastQuestion = 4;
    const MAX_TIME = 30;
    this.setState({
      timer: MAX_TIME,
      currentQuestion: currentQuestion + 1,
      pauseTimer: false,
    });
    this.updateTimer();
  }

  showBtnNextQuestion() {
    return (
      <button
        className="button-nextQuestion"
        type="button"
        data-testid="btn-next"
        onClick={ () => this.handleNextQuestion() }
      >
        Next Question
      </button>
    );
  }

  page() {
    const {
      data,
      currentQuestion,
      timer,
    } = this.state;
    const { timeOff } = this.props;
    const shouldRedirect = 5;
    if (currentQuestion === shouldRedirect) {
      return <Redirect to="/feedback" />;
    }
    return (
      <section>
        <Header />
        <section className="section-game">
          <fieldset className="fieldset-question">
            { timer }
            <h1
              data-testid="question-category"
            >
              {data.results[currentQuestion].category}
            </h1>
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
        </section>
      </section>
    );
  }

  pageRender() {
    const { loading } = this.state;
    return loading ? <Loading /> : this.page();
  }

  render() {
    const { name, gravatarEmail, score, assertions } = this.props;
    localStorage.setItem('state', JSON
      .stringify({ player: { name, assertions, score, gravatarEmail } }));
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
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  pauseTimer: (timer) => {
    dispatch(pauseTime(timer));
  },
  player: (name, assertions, score, gravatarEmail) => (
    dispatch(actionPlayer(name, assertions, score, gravatarEmail))),
  changeTimer: (timer) => dispatch(noTime(timer)),
});

Game.propTypes = {
  isLoading: PropTypes.bool,
  token: PropTypes.string,
  timeOff: PropTypes.bool,
  pauseTimer: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
