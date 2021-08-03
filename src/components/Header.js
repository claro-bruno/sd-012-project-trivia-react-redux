import React from 'react';
import md5 from 'crypto-js/md5';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const userMailHashCode = md5('email-que-virá-do-state@trybe.com').toString();
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
            <span className="player-name" data-testid="header-player-name" />
            Nuwanda
          </span>
        </div>
        <div className="player-score">
          <span>
            Pontuação:
            <span className="player-score-number" data-testid="header-score">
              20
            </span>
          </span>
        </div>
      </header>
    );
  }
}

export default Header;
