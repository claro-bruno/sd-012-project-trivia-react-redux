import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setScore } from '../redux/action';

const cinco = 5;

class GameBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      disable: true,
      alternatives: [],
      randomIndex: '',
      disableAnswers: false,
      hidden: true,
      wrong: '',
      correct: '',
      seconds: 30,
      stopTimer: false,
      assertions: 0,
      score: 0,
    };
    this.createQuestion = this.createQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.rad = this.rad.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.buttonsAnswer = this.buttonsAnswer.bind(this);
    this.count = this.count.bind(this);
    this.handleClickScore = this.handleClickScore.bind(this);
    this.mountLocalStorage = this.mountLocalStorage.bind(this);
  }

  componentDidMount() {
    this.count();
    this.rad();
    this.mountLocalStorage();
  }

  count() {
    const sec = 1000;
    const interval = setInterval(() => {
      const { seconds, stopTimer } = this.state;
      this.setState({
        seconds: seconds - 1,
      });
      if (seconds === 1 || stopTimer) {
        clearInterval(interval);
        this.setState({
          seconds: 'Time\'s Up',
          disableAnswers: true,
          hidden: false,
        });
      }
    }, sec);
  }

  mountLocalStorage(score = 0, assertions = 0) {
    const { name, gravatarEmail, setStateScore } = this.props;
    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    };
    this.setState({
      score: state.player.score,
      assertions: state.player.assertions,
    });
    localStorage.setItem('state', JSON.stringify(state));
    setStateScore(state.player.score, state.player.assertions);
  }

  handleClickScore(diff) {
    const { seconds, assertions, score } = this.state;
    const dez = 10;
    const diffLevel = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const scoreSum = score + dez + (seconds * diffLevel[diff]);
    const assertSum = assertions + 1;
    this.setState({
      stopTimer: true,
    });
    this.mountLocalStorage(scoreSum, assertSum);
    this.buttonsAnswer();
  }

  nextQuestion() {
    const { index } = this.state;
    this.setState({
      index: index < cinco ? index + 1 : index,
      disableAnswers: false,
      hidden: true,
      correct: '',
      wrong: '',
      seconds: 30,
      stopTimer: false,
    });
    this.rad();
    this.count();
  }

  createQuestion() {
    const { results } = this.props;
    const { index } = this.state;
    const { category, question } = results[index];
    return (
      <div>
        <h3 data-testid="question-category">{ category }</h3>
        <h2 data-testid="question-text">{ question }</h2>
        {this.createOptions ? this.createOptions() : ''}
      </div>
    );
  }

  rad() {
    const { results } = this.props;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = results[0];
    const randomIndex = Math.round(Math.random() * (incorrectAnswers.length - 0));
    incorrectAnswers.splice(randomIndex, 0, correctAnswer);
    this.setState({
      alternatives: incorrectAnswers,
      randomIndex,
    });
  }

  createOptions() {
    const { index } = this.state;
    const { results } = this.props;
    const { difficulty } = results[index];

    const {
      alternatives,
      randomIndex,
      wrong,
      correct,
      disableAnswers,
    } = this.state;
    return (alternatives.map((elm, ind) => (
      ind === randomIndex
        ? (
          <button
            type="button"
            disabled={ disableAnswers }
            onClick={ () => (this.handleClickScore(difficulty)) }
            key={ ind }
            data-testid="correct-answer"
            id={ correct }
            style={ { border: correct } }
          >
            {elm}
          </button>
        )
        : (
          <button
            type="button"
            onClick={ this.buttonsAnswer }
            disabled={ disableAnswers }
            key={ ind }
            data-testid={ `wrong-answer-${ind}` }
            id={ wrong }
            style={ { border: wrong } }
          >
            {elm}
          </button>
        )
    )));
  }

  buttonsAnswer() {
    this.setState({
      disableAnswers: true,
      wrong: '3px solid rgb(255, 0, 0)',
      correct: '3px solid rgb(6, 240, 15)',
      hidden: false,
    });
  }

  render() {
    const { disable, hidden, seconds, index } = this.state;
    const { results } = this.props;
    if (index >= cinco) return <Redirect to="/feedback" />;
    return (
      <div>
        <p>Timer</p>
        <span>
          { seconds }
        </span>
        {
          (results.length > 0) ? this.createQuestion() : <p>LOADING</p>
        }
        <button
          type="button"
          disable={ disable }
          onClick={ this.nextQuestion }
          data-testid="btn-next"
          hidden={ hidden }
        >
          Next
        </button>
      </div>
    );
  }
}

GameBody.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStateScore: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.questions.results,
  score: state.questions.score,
  name: state.user.name,
  gravatarEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  setStateScore: (score, assertions) => dispatch(setScore(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBody);
