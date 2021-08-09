import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  criptEmail(email) {
    const criptedEmail = md5(email).toString();
    return (`https://www.gravatar.com/avatar/${criptedEmail}`);
  }

  render() {
    const { email, name, score } = this.props;
    return (
      <header>
        <img
          className="profile-image"
          data-testid="header-profile-picture"
          src={ this.criptEmail(email) }
          alt="Foto do jogador"
        />
        <h2 data-testid="header-player-name">
          { name }
        </h2>
        <h2 data-testid="header-score">{ score }</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

Header.defaultProps = {
  name: undefined,
  email: undefined,
  score: undefined,
};

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
};

export default connect(mapStateToProps)(Header);
