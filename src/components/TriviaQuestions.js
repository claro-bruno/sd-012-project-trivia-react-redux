import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AnswerButton from './AnswerButton';
import Timer from './Timer';
import { getScore } from '../redux/actions';

const easyRate = 1;
const mediumRate = 2;
const hardRate = 3;
const standardValue = 10;

class TriviaQuestions extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      correctanswer: '',
      incorrectanswer: '',
      disabled: false,
      myTimer: true,
      answerBtn: false,
      redirect: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.changeClassStyle = this.changeClassStyle.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
    this.onCorrectAnswer = this.onCorrectAnswer.bind(this);
    this.sendUserRanking = this.sendUserRanking.bind(this);
  }

  onCorrectAnswer() {
    const { playerState, sendScore } = this.props;
    const { id } = this.state;
    const { difficulty } = playerState[id];
    const timerOnScreen = document.querySelector('.timer-value').innerHTML;

    const score = standardValue + (
      Number(timerOnScreen) + this.difficultyRate(difficulty)
    );

    this.changeClassStyle();
    const userState = JSON.parse(localStorage.getItem('state'));
    userState.player.score += score;
    userState.player.assertions += 1;
    sendScore(score);
    localStorage.setItem('state', JSON.stringify(userState));
  }

  difficultyRate(value) {
    if (value === 'easy') {
      return easyRate;
    }
    if (value === 'medium') {
      return mediumRate;
    }
    return hardRate;
  }

  changeClassStyle() {
    this.setState({
      incorrectanswer: '3px solid rgb(255, 0, 0)',
      correctanswer: '3px solid rgb(6, 240, 15)',
      disabled: true,
      answerBtn: true,
    });
  }

  shuffleQuestions({ correct_answer: correct, incorrect_answers: incorrect }) {
    const arrayQuestions = [correct, ...incorrect];
    const numOfQuestions = 0.5;
    const randomQuestions = arrayQuestions.sort(() => Math.random() - numOfQuestions);
    return randomQuestions;
  }

  sendUserRanking(state) {
    const { findPlayerName } = this.props;
    const token = localStorage.getItem('token');
    const playerImg = `https://www.gravatar.com/avatar/${token}`;
    const userRanking = {
      name: findPlayerName, score: state.player.score, picture: playerImg,
    };
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify(
        [userRanking],
      ));
      return userRanking;
    }
    const entireRanking = JSON.parse(localStorage.getItem('ranking'));
    localStorage.setItem('ranking', JSON.stringify(
      [...entireRanking, userRanking],
    ));
  }

  handleClick() {
    const { id } = this.state;
    const questionLength = 4;
    if (id === questionLength) {
      const state = JSON.parse(localStorage.getItem('state'));
      this.sendUserRanking(state);
      this.setState({
        redirect: true,
      });
    }
    this.setState((prevState) => ({
      id: prevState.id + 1,
      correctanswer: '',
      incorrectanswer: '',
      disabled: false,
      myTimer: false,
      answerBtn: false,
    }), () => {
      this.setState({
        myTimer: true,
      });
    });
  }

  render() {
    const { playerState } = this.props;
    const {
      correctanswer, incorrectanswer, id, disabled, myTimer, answerBtn, redirect,
    } = this.state;
    if (playerState.length === 0) return <span>Carregando...</span>;
    if (redirect) return <Redirect to="/feedback" />;
    const { category, question, correct_answer: correct } = playerState[id];
    const arrayQuestions = this.shuffleQuestions(playerState[id]);
    return (
      <section>
        <h3 data-testid="question-category">{ category }</h3>
        <h4 data-testid="question-text">{ question }</h4>
        { arrayQuestions.map((answer, index) => {
          const incorrectAnswers = arrayQuestions.filter((ans) => ans !== correct);
          if (answer === correct) {
            return (
              <button
                key={ index }
                data-testid="correct-answer"
                style={ { border: correctanswer } }
                type="button"
                onClick={ this.onCorrectAnswer }
                disabled={ disabled }
              >
                { answer }
              </button>
            );
          }
          const indexWrong = incorrectAnswers.indexOf(answer);
          return (
            <button
              data-testid={ `wrong-answer-${indexWrong}` }
              style={ { border: incorrectanswer } }
              type="button"
              key={ index }
              onClick={ this.changeClassStyle }
              disabled={ disabled }
            >
              { answer }
            </button>
          );
        }) }
        { answerBtn ? <AnswerButton handleClick={ this.handleClick } /> : '' }
        { myTimer ? <Timer changeClassStyle={ this.changeClassStyle } /> : '' }
      </section>
    );
  }
}

TriviaQuestions.propTypes = {
  playerState: PropTypes.objectOf({
    question: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  findPlayerName: PropTypes.string.isRequired,
  sendScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendScore: (payload) => dispatch(getScore(payload)),
});

const mapStateToProps = (state) => ({
  playerState: state.fetchReducers.questions,
  findPlayerName: state.user.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaQuestions);
