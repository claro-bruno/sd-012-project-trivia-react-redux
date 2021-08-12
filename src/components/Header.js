import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import '../styles/header.css';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const getImg = `https://www.gravatar.com/avatar/${hash}`;

    // https://github.com/tryber/sd-010-a-project-trivia-react-redux/pull/600/
    // commits/6c6c13f6c3fdfb09f19cf9f33f6e8cd814b7bd04
    return (
      <div className="header_trivia">
        <header>
          <div className="header_trivia_player">
            <img data-testid="header-profile-picture" src={ getImg } alt="user avatar" />
            <p data-testid="input-gravatar-email">
              Email:
              {' '}
              { gravatarEmail }
            </p>
            <p data-testid="header-player-name">
              Nome:
              {' '}
              { name }
            </p>
            <p data-testid="header-score">
              Pontuação:
              {' '}
              { score }
            </p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
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
