import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import ButtonNext from '../components/gameControlled/ButtonNext';
import SectionQuestions from '../components/gameControlled/SectionQuestions';
import { addAssertions } from '../redux/actions';
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
    this.setButtonQuestionStyle = this.setButtonQuestionStyle.bind(this);
    this.setCorrectAnswer = this.setCorrectAnswer.bind(this);
    this.setInicialCount = this.setInicialCount.bind(this);
    this.setStateProperties = this.setStateProperties.bind(this);
    this.timer = this.timer.bind(this);
    this.wrongClick = this.wrongClick.bind(this);

    this.state = {
      correctAnswers: 0,
      questionPosition: 0,
      questionsDisable: false,
      color: false,
      count: 30,
      nextButtonInvisible: true,
      redirect: false,
    };
  }

  componentDidMount() {
    const { startTime } = this;

    startTime();
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

  correctClick() {
    const {
      setCorrectAnswer,
      setButtonQuestionStyle,
      buttonNextStatus,
      props: { setAssertions },
      state: { correctAnswers },
    } = this;

    clearInterval(this.interval);

    setCorrectAnswer();
    setButtonQuestionStyle();
    setAssertions(correctAnswers);
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
    const {
      setStateProperties, state: { count } } = this;

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

const { func } = PropTypes;
Game.propTypes = {
  setAssertions: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setAssertions: (assertions) => dispatch(addAssertions(assertions)),
});

export default connect(null, mapDispatchToProps)(Game);
