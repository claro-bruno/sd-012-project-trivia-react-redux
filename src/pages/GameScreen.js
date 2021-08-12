import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf, objectOf, bool, number } from 'prop-types';
import Header from '../components/Header/Header';
import fetchQuestions from '../fetchs/fetchQuestions';
import QuestionCategory from '../components/Question/QuestionCategory';
import QuestionText from '../components/Question/QuestionText';
import QuestionAnswers from '../components/Question/QuestionAnswers';
import { setAnsweredTrueIncorrect, setStoreScore } from '../actions';
import calculateScore from '../functions/calculateScore';
// import saveInfoLocalStorage from '../functions/saveInfoLocalStorage';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };

    this.countdown = this.countdown.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    const { dispatchQuestions } = this.props;
    dispatchQuestions();
    this.startTimer();
  }

  componentDidUpdate() {
    const { state } = this;
    const { timer } = this.state;
    const {
      getQuestions,
      getQuestionNumber,
      isCorrect,
      // name,
      // email,
      // getScore,
      // getAssertions,
    } = this.props;
    const { answered, answeredTrueIncorrect, storeScore } = this.props;
    if (answered === true) {
      clearInterval(this.interval);
      const score = calculateScore(
        timer,
        getQuestions[getQuestionNumber].difficulty,
        isCorrect,
      );
      storeScore(score);
    }
    if (state.timer === 0) {
      clearInterval(this.interval);
      answeredTrueIncorrect();
    }
  }

  countdown() {
    const { timer } = this.state;
    this.setState({
      timer: timer - 1,
    });
  }

  startTimer() {
    const { timer } = this.state;
    const start = 30;
    if (timer !== start) {
      this.setState({
        timer: 30,
      });
    }
    const setTimer = 1000;
    this.interval = setInterval(this.countdown, setTimer);
  }

  render() {
    const { getQuestions, getLoading, getQuestionNumber } = this.props;
    const { timer } = this.state;
    if (getLoading) return <p>Loading...</p>;
    return (
      <div
        className="game-screen-container"
      >
        <Header timer={ timer } />
        <div
          className="game-question-container"
        >
          <div
            className="category-question-container"
          >
            <QuestionCategory
              category={ getQuestions[getQuestionNumber].category }
            />
            <QuestionText
              question={ getQuestions[getQuestionNumber].question }
            />
          </div>
          <div
            className="answerers-container"
          >
            <QuestionAnswers
              startTimer={ this.startTimer }
              type={ getQuestions[getQuestionNumber].type }
              correctAnswer={ getQuestions[getQuestionNumber].correct_answer }
              wrongAnswers={ getQuestions[getQuestionNumber].incorrect_answers }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispathToProps = (dispatch) => ({
  dispatchQuestions: (questions) => (dispatch(fetchQuestions(questions))),
  answeredTrueIncorrect: () => dispatch(setAnsweredTrueIncorrect()),
  storeScore: (score) => dispatch(setStoreScore(score)),
});

const mapStateToProps = ({ questions }) => ({
  getQuestions: questions.questions,
  getQuestionsDifficulty: questions.difficulty,
  getLoading: questions.loading,
  getQuestionNumber: questions.questionNumber,
  answered: questions.answered,
  isCorrect: questions.correct,
});

GameScreen.propTypes = {
  dispatchQuestions: func.isRequired,
  getQuestions: arrayOf(objectOf).isRequired,
  getLoading: bool.isRequired,
  getQuestionNumber: number.isRequired,
  answered: bool.isRequired,
  answeredTrueIncorrect: func.isRequired,
  storeScore: func.isRequired,
  isCorrect: bool.isRequired,
};

export default connect(mapStateToProps, mapDispathToProps)(GameScreen);
