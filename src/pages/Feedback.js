import React from 'react';

class Feedback extends React.Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { score, gravatarEmail, name } = player;
    return (
      <header>
        <h1 data-testid="feedback-text">Feedbacks</h1>
        <img
          data-testid="header-profile-picture"
          src={ gravatarEmail }
          alt="Foto do Usuario"
        />
        <span data-testid="header-score">{ score }</span>
        <span data-testid="header-player-name">{ name }</span>
      </header>
    );
  }
}

export default Feedback;
