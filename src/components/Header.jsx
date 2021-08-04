import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <img src="" alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name" >PlayerName</p>
        <p data-testid="header-score" >Score</p>
      </header>
    );
  }
}

export default Header;
