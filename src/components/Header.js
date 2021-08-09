import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { userMail, userName } = this.props;
    const playerData = JSON.parse(localStorage.getItem('state'));
    const userMailHashCode = md5(userMail).toString();

    return (
      <header className="standard-header">
        <div className="player-info">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${userMailHashCode}` }
            alt="avatar do jogador"
            className="player-image"
          />
          <span className="jogador-span">
            Jogador:
            <span className="player-name" data-testid="header-player-name">
              {userName}
            </span>
          </span>
        </div>
        <div className="player-score">
          <span>
            Pontuação:
            <span className="player-score-number" data-testid="header-score">
              {playerData ? playerData.score : 0}
              
            </span>
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userMail: PropTypes.string,
  userName: PropTypes.string,
  userPoints: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  userMail: state.loginReducer.email,
});

export default connect(mapStateToProps)(Header);
