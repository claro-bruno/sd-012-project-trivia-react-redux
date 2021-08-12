import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Header from '../components/Header';
import './Login.css';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      borderGreen: 'without',
      borderRed: 'without,',
      isDisable: false,
      timeCount: 30,
      isActive: false,
      score: 0,
      assertions: 0,
    };

    this.renderNextButton = this.renderNextButton.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.renderQuestionsApi = this.renderQuestionsApi.bind(this);
    this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
    this.getPointsAndSaveInLocalStorage = this.getPointsAndSaveInLocalStorage.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    return (this.setTimer());
  }

  componentWillUnmount() {
    this.createRankingLocalStorage();
  }

  setTimer() {
    const second = 1000;
    this.timer = setInterval(() => {
      const { timeCount } = this.state;
      const remainingTime = timeCount - 1;
      if (remainingTime >= 0) {
        this.setState({
          timeCount: remainingTime,
        });
      } else {
        this.setState({
          isActive: true,
        });
        this.stopTimer();
      }
    }, second);
  }

  getPointsAndSaveInLocalStorage(difficulty) {
    const { timeCount } = this.state;
    const point = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    let difficultyPoint = 0;

    switch (difficulty) {
    case 'easy':
      difficultyPoint = easy;
      break;
    case 'medium':
      difficultyPoint = medium;
      break;
    case 'hard':
      difficultyPoint = hard;
      break;
    default:
      return difficultyPoint;
    }
    this.setState((prevState) => ({
      score: prevState.score + point + (timeCount * difficultyPoint),
      assertions: prevState.assertions + 1,
    }));
  }

  createRankingLocalStorage() {
    const { score } = this.state;
    const { userPlayer: { name, gravatarEmail } } = this.props;
    const newRanking = {
      name,
      gravatarEmail,
      score,
    };
    const rankingLocalStorage = JSON.parse(localStorage.getItem('ranking')) || [];
    localStorage.setItem('ranking', JSON.stringify([...rankingLocalStorage, newRanking]));
  }

  handleAnswerButtonClick(difficulty) {
    this.setState({
      borderGreen: 'border-green',
      borderRed: 'border-red',
      isActive: true,
    });
    this.getPointsAndSaveInLocalStorage(difficulty);
    return (this.stopTimer());
  }

  stopTimer() {
    this.setState({ isDisable: true });
    return (clearInterval(this.timer));
  }

  handleNextButton() {
    const { count } = this.state;
    const fourQuestions = 4;
    const { history } = this.props;
    if (count < fourQuestions) {
      this.setState({
        count: count + 1,
        timeCount: 30,
        isDisable: false,
        borderGreen: 'without',
        borderRed: 'without,',
        isActive: false,
      });
      this.setTimer();
    } else {
      return (history.push('/feedback'));
    }
  }

  renderNextButton() {
    const { isActive, count } = this.state;
    const fourQuestions = 4;
    return (
      <div>
        {isActive ? (
          <Button
            color="warning"
            size="lg"
            className="btnStyle"
            type="button"
            data-testid="btn-next"
            onClick={ () => this.handleNextButton() }
          >
            { count < fourQuestions ? 'Próxima' : 'Resultado'}
          </Button>
        ) : null}
      </div>
    );
  }

  renderQuestionsApi() {
    const { requestGameApi } = this.props;
    const { count, borderGreen, borderRed, isDisable } = this.state;
    const dataResults = requestGameApi.results;
    const incorrectAnswers = dataResults && dataResults
      .map((item) => item.incorrect_answers)[count];
    return (
      <>
        {dataResults && dataResults.map((item) => (
          <>
            <div className="questionsStyle">
              <h2 data-testid="question-category">{item.category}</h2>
              <p data-testid="question-text">{item.question}</p>
            </div>

            <button
              name="correct"
              type="button"
              data-testid="correct-answer"
              className={ borderGreen }
              disabled={ isDisable }
              onClick={ () => this.handleAnswerButtonClick(item.difficulty) }
            >
              {item.correct_answer}
            </button>
          </>
        ))[count]}
        {incorrectAnswers && incorrectAnswers.map((item, index) => (
          <button
            name="incorrect"
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className={ borderRed }
            disabled={ isDisable }
            onClick={ () => this.handleAnswerButtonClick() }
          >
            {item}
          </button>

        ))}
        {this.renderNextButton()}
      </>
    );
  }

  render() {
    const { timeCount, score, assertions } = this.state;
    const { userPlayer: { name, gravatarEmail } } = this.props;
    const player = { name, assertions, score, gravatarEmail };
    const state = { player };
    localStorage.setItem('state', JSON.stringify(state));
    return (
      <div>
        <h1 className="tilte"> </h1>

        <Header score={ score } />
        <p className="timer">
          {' Timer   '}
          {timeCount}
        </p>
        { this.renderQuestionsApi() }

      </div>
    );
  }
}

GameScreen.propTypes = {
  userPlayer: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  userPlayer: state.user.userInfo,
  requestGameApi: state.game.gameDataApi,
});

export default connect(mapStateToProps)(GameScreen);
