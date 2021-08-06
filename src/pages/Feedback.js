import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class FeedBack extends React.Component {
  constructor() {
    super();
    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const {
      player:
      {
        name,
        assertions,
        gravatarEmail,
        score,
      } } = JSON.parse(localStorage.getItem('state'));
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
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Jogar Novamente
        </button>
      </div>
    );
  }
}

FeedBack.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default FeedBack;
