import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      player: [],
    };
    this.handlePlayer = this.handlePlayer.bind(this);
  }

  handlePlayer() {
    const state = JSON.parse(localStorage.getItem('state'));
    const player = {
      name: state.name,
      assertions: state.assertions,
      score: state.score,
      gravatarEmail: state.gravatarEmail,
    };

    this.setState({ player });
  }

  render() {
    const { player } = this.state;
    const { score } = this.props;
    if (player.length === 0) {
      this.handlePlayer();
    }

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` }
          alt={ player.name }
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ `${player.name}` }</span>
        <span data-testid="header-score">
          Score:
          {score}
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Header;
