import React from 'react';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      userimage: '',
      score: 0,
    };
  }

  render() {
    const { name, userimage, score } = this.state;
    return (
      <header className="main-header">
        <h1 className="logo">BRAINTEST</h1>
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <p data-testid="header-score">{`Pontuação: ${score}`}</p>
        <image data-testid="header-profile-picture" src={ userimage } />
      </header>
    );
  }
}

export default Header;
