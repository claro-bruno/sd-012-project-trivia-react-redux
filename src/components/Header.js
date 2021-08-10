import React, { Component } from 'react';


class Header extends Component {
 
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const {score, name, gravatarEmail} = state.player;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ `${name}` }</span>
        <span data-testid="header-score">
          Score:
          {score}
        </span>
      </header>
    );
  }
}

export default Header;
