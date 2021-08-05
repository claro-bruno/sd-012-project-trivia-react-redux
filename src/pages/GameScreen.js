import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiGame } from '../actions';

class GameScreen extends Component {
  constructor() {
    super();

    this.renderHeader = this.renderHeader.bind(this);
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

  render() {
    return (
      <div>
        <h1>Tela Jogo</h1>
        { this.renderHeader() }
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
