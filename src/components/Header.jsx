import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { player: {
      score,
      name,
      gravatarEmail } } = JSON.parse(localStorage.getItem('state'));
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="Imagem Avatar"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">
          { score }
        </h2>
      </header>
    );
  }
}

export default Header;
