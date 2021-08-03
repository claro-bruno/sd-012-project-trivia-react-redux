import React from 'react';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="standard-header">
        <div className="player-info">
          <img
            data-testid="header-profile-picture"
            src="info/vinda/do/store"
            alt="avatar do jogador"
          />
          <span>
            Jogador:
            <span data-testid="header-player-name" />
            Nuwanda
          </span>
        </div>
        <div className="player-score">
          <span>
            Pontuação:
            <span data-testid="header-score">
              20
            </span>
          </span>
        </div>
      </header>
    );
  }
}

export default Header;
