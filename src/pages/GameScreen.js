import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiGame } from '../actions';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.renderQuestionsApi = this.renderQuestionsApi.bind(this);
  }

  componentDidMount() {
    const { dispatchGameApi } = this.props;
    dispatchGameApi();
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

    console.log(dataResults);

    return (
      <div>
        { dataResults && dataResults.map((item, index) => (
          <>
            <p data-testid="question-category">{ item.category }</p>
            <p data-testid="question-text">{ item.question }</p>
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
              key={ index }
            >
              { item.incorrect_answers }
            </button>
            <button
              type="button"
              data-testid="correct-answer"
            >
              { item.correct_answer }
            </button>
          </>
        ))[count] }
      </div>
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

const mapDispatchToProps = (dispatch) => ({
  dispatchGameApi: (state) => dispatch(fetchApiGame(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
