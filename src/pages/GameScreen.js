import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../App.css';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      borderGreen: 'without',
      borderRed: 'without',
      question: 'correct',
      score: 0,
      assertions: 0,
      name: '',
      gravatarEmail: '',
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.renderQuestionsApi = this.renderQuestionsApi.bind(this);
    this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
    this.getPointsAndSaveInLocalStorage = this.getPointsAndSaveInLocalStorage.bind(this);
  }

  componentDidUpdate() {
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

  getPointsAndSaveInLocalStorage() {
    const { score, assertions, question } = this.state;
    const point = 10;
    const dificulty = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    if (question === 'correct' && dificulty.hard) {
      this.setState({
        score: (score + point + dificulty.hard),
        assertions: (assertions + 1),
      });
    } else if (question === 'correct' && dificulty.medium) {
      this.setState({
        score: (score + point + dificulty.medium),
        assertions: (assertions + 1),
      });
    } else if (question === 'correct' && dificulty.easy) {
      this.setState({
        score: (score + point + dificulty.easy),
        assertions: (assertions + 1),
      });
    }
    // return score;
  }

  handleAnswerButtonClick(click) {
    this.setState({
      borderGreen: 'border-green',
      borderRed: 'border-red',
    });
    this.getPointsAndSaveInLocalStorage(click);
  }

  renderHeader() {
    const { userPlayer: { name, gravatarEmail } } = this.props;
    const { score } = this.state;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="Imagem Avatar"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h3 data-testid="header-score">{ score }</h3>
      </header>
    );
  }

  renderQuestionsApi() {
    const { requestGameApi } = this.props;
    const { count, question } = this.state;
    const dataResults = requestGameApi.results;
    const incorrectAnswers = dataResults && dataResults
      .map((item) => item.incorrect_answers)[count];

    const { borderGreen } = this.state;
    const { borderRed } = this.state;

    return (
      <>
        { dataResults && dataResults.map((item) => (
          <>
            <p data-testid="question-category">{ item.category }</p>
            <p data-testid="question-text">{ item.question }</p>
            <button
              type="button"
              id={ question }
              data-testid="correct-answer"
              className={ borderGreen }
              onClick={ () => this.handleAnswerButtonClick() }
            >
              { item.correct_answer }
            </button>
          </>
        ))[count] }
        { incorrectAnswers && incorrectAnswers.map((item, index) => (
          <button
            type="button"
            name="incorrect"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className={ borderRed }
            onClick={ () => this.handleAnswerButtonClick() }
          >
            { item }
          </button>
        )) }
      </>
    );
  }

  render() {
    return (
      <div>
        <h1>Tela Jogo</h1>
        { this.renderHeader() }
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
