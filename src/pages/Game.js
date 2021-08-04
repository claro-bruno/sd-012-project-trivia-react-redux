import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Game extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const getImg = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ getImg } alt="user avatar" />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.player.name,
  gravatarEmail: state.login.player.gravatarEmail,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
};

Game.defaultProps = {
  name: '',
  gravatarEmail: '',
};
