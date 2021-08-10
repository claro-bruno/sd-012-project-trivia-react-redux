import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const getImg = `https://www.gravatar.com/avatar/${hash}`;

    // https://github.com/tryber/sd-010-a-project-trivia-react-redux/pull/600/
    // commits/6c6c13f6c3fdfb09f19cf9f33f6e8cd814b7bd04
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ getImg } alt="user avatar" />
          <p data-testid="input-gravatar-email">{ gravatarEmail }</p>
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.player.name,
  gravatarEmail: state.login.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
};

Header.defaultProps = {
  name: '',
  gravatarEmail: '',
  score: 0,
};
