import React from 'react';
import md5 from 'crypto-js/md5';

class FeedBack extends React.Component {
  render() {
    const {
      player:
      { name, gravatarEmail, score } } = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <p data-testid="feedback-text">FeedBack</p>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          data-testid="header-profile-picture"
          alt={ `Name:${name}` }
        />
        <h3 data-testid="header-player-name">{name}</h3>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

export default FeedBack;
