import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import ButtonNext from '../components/gameControlled/ButtonNext';
import SectionQuestions from '../components/gameControlled/SectionQuestions';
import '../App.css';

class Game extends React.Component {
  constructor() {
    super();

    this.buttonNextStatus = this.buttonNextStatus.bind(this);
    this.correctClick = this.correctClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.startTime = this.startTime.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.timer = this.timer.bind(this);
    this.setButtonQuestionStyle = this.setButtonQuestionStyle.bind(this);
    this.setCorrectAnswer = this.setCorrectAnswer.bind(this);
    this.setInicialCount = this.setInicialCount.bind(this);
    this.setStateProperties = this.setStateProperties.bind(this);
    this.wrongClick = this.wrongClick.bind(this);
    this.setScore = this.setScore.bind(this);

    this.state = {
      correctAnswers: 0,
      score: 0,
      questionPosition: 0,
      questionsDisable: false,
      color: false,
      count: 30,
      nextButtonInvisible: true,
      gravatarEmail: '',
      redirect: false,
    };
  }

  componentDidMount() {
    const { startTime } = this;

    startTime();

    const { setStateProperties, props: { userData: { email } } } = this;
    const profile = md5(email).toString();
    const SRC = `https://www.gravatar.com/avatar/${profile}`;

    setStateProperties('gravatarEmail', SRC);
  }

  componentDidUpdate() {
    const { stopTime } = this;

    stopTime();
  }

  setCorrectAnswer() {
    const {
      setStateProperties, buttonNextStatus, state: { correctAnswers },
    } = this;

    setStateProperties('correctAnswers', correctAnswers + 1);
    buttonNextStatus();
  }

  setButtonQuestionStyle() {
    const {
      setStateProperties, state: { questionsDisable, color },
    } = this;

    setStateProperties('questionsDisable', !questionsDisable);
    setStateProperties('color', !color);
  }

  setInicialCount() {
    const { setStateProperties } = this;
    const VALUE_COUNT = 30;

    setStateProperties('count', VALUE_COUNT);
  }

  setStateProperties(key, value) {
    this.setState((state) => ({
      ...state,
      [key]: value,
    }));
  }

  setScore(difficulty, count) {
    const level = { hard: 3, medium: 2, easy: 1 }[difficulty];
    const INITIAL_PARAMETER = 10;
    const points = INITIAL_PARAMETER + (level * count);

    const { props: { userData: { user } },
      state: { gravatarEmail, correctAnswers, score, redirect },
      setStateProperties } = this;
    setStateProperties('score', score + points);

    if (redirect === true) {
      const player = { name: user, gravatarEmail, assertions: correctAnswers, score };
      localStorage.setItem('player', JSON.stringify(player));
    }
  }

  correctClick(difficulty) {
    const {
      setCorrectAnswer,
      setButtonQuestionStyle,
      buttonNextStatus,
      setScore,
      state: { count },
    } = this;

    clearInterval(this.interval);
    setScore(difficulty, count);
    setCorrectAnswer();
    setButtonQuestionStyle();
    buttonNextStatus();
  }

  nextClick() {
    const {
      startTime,
      setInicialCount,
      setButtonQuestionStyle,
      buttonNextStatus,
      nextQuestion,
      setStateProperties,
      state: { questionPosition },
    } = this;

    const numberMax = 4;

    if (questionPosition === numberMax) {
      setStateProperties('redirect', true);
    } else {
      nextQuestion();
      setButtonQuestionStyle();
      setInicialCount();
      startTime();
      buttonNextStatus();
    }
  }

  buttonNextStatus() {
    const {
      setStateProperties, state: { nextButtonInvisible },
    } = this;

    setStateProperties('nextButtonInvisible', !nextButtonInvisible);
  }

  nextQuestion() {
    const {
      setStateProperties, state: { questionPosition },
    } = this;

    setStateProperties('questionPosition', questionPosition + 1);
  }

  startTime() {
    const { timer } = this;
    const ONE_SECOND = 1000;

    this.interval = setInterval(timer, ONE_SECOND);
  }

  stopTime() {
    const { wrongClick, setInicialCount, state: { count } } = this;

    if (count === 0) {
      clearInterval(this.interval);
      wrongClick();
      setInicialCount();
    }
  }

  timer() {
    const { setStateProperties,
      state: { count } } = this;

    setStateProperties('count', count - 1);
  }

  wrongClick() {
    const { setButtonQuestionStyle, buttonNextStatus } = this;

    clearInterval(this.interval);

    setButtonQuestionStyle();
    buttonNextStatus();
  }

  render() {
    const {
      state: { questionPosition,
        questionsDisable,
        color,
        count,
        nextButtonInvisible,
        redirect,
      },
      nextClick,
      correctClick,
      wrongClick,
    } = this;

    return (
      <>
        { redirect && <Redirect to="/feedback" /> }
        <Header />
        <ButtonNext invisible={ nextButtonInvisible } handleClick={ nextClick } />
        <SectionQuestions
          questionPosition={ questionPosition }
          correctClick={ correctClick }
          wrongClick={ wrongClick }
          questionsDisable={ questionsDisable }
          color={ color }
          count={ count }
        />
      </>
    );
  }
}

const { string, objectOf } = PropTypes;
Game.propTypes = {
  userData: objectOf(string).isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.addLoginReducer,
});

export default connect(mapStateToProps, null)(Game);
