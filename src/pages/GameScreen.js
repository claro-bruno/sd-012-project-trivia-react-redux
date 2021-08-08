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
      borderRed: 'without,',
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.renderQuestionsApi = this.renderQuestionsApi.bind(this);
    this.changeBorderAnswerClick = this.changeBorderAnswerClick.bind(this);
  }

  changeBorderAnswerClick() {
    this.setState({
      borderGreen: 'border-green',
      borderRed: 'border-red',
    });
  }

  renderHeader() {
    const { userPlayer: { name, gravatarEmail } } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="Imagem Avatar"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h3 data-testid="header-score">0</h3>
      </header>
    );
  }

  renderQuestionsApi() {
    const { requestGameApi } = this.props;
    const { count } = this.state;
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
              data-testid="correct-answer"
              className={ borderGreen }
              onClick={ () => this.changeBorderAnswerClick() }
            >
              { item.correct_answer }
            </button>
          </>
        ))[count] }
        { incorrectAnswers && incorrectAnswers.map((item, index) => (
          <button
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className={ borderRed }
            onClick={ () => this.changeBorderAnswerClick() }
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
