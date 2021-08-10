import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../App.css';

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
      name: '',
      gravatarEmail: '',
    };

    this.renderNextButton = this.renderNextButton.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.renderQuestionsApi = this.renderQuestionsApi.bind(this);
    this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
    this.getPointsAndSaveInLocalStorage = this.getPointsAndSaveInLocalStorage.bind(this);
    this.createLocalStorage = this.createLocalStorage.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    return (this.setTimer());
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

  createLocalStorage() {
    const { score, assertions, name, gravatarEmail } = this.state;

    const stateLocalStorage = {
      player: {
        score,
        assertions,
        name,
        gravatarEmail,
      },
    };
    const keyLocalStorage = JSON.stringify(stateLocalStorage);
    localStorage.setItem('state', keyLocalStorage);
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
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => this.handleNextButton() }
          >
            { count < fourQuestions ? 'Próxima' : 'Resultado'}
          </button>
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
            <p data-testid="question-category">{item.category}</p>
            <p data-testid="question-text">{item.question}</p>
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
    const { timeCount, score } = this.state;
    return (
      <div>
        <h1>Tela Jogo</h1>
        <Header score={ score } />
        { this.renderQuestionsApi() }
        <p>
          {' '}
          {timeCount}
        </p>
        {this.createLocalStorage()}
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
