import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const hashGravatar = md5(email).toString();
    return (
      <header className="fixed-top row justify-content-center align-items-center">
        <h1 className="header-title position-absolute">TRIVIA</h1>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashGravatar}` }
          alt="avatar"
        />
        <h4 className="header-name" data-testid="header-player-name">{ name }</h4>
        <h4 className="header-score position-absolute" data-testid="header-score">
          Pontuação:
          {score}
        </h4>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.game.score,
});

export default connect(mapStateToProps)(Header);
