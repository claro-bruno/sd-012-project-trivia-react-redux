import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import './feedback.css';

class FeedBack extends React.Component {
  constructor() {
    super();
    this.playAgain = this.playAgain.bind(this);
    this.goToRanking = this.goToRanking.bind(this);
  }

  componentDidMount() {
    const { player: { name, email, score } } = JSON.parse(localStorage.getItem('state'));
    const playerImage = `https://www.gravatar.com/avatar/${md5(email).toString()}`;

    const newRanking = {
      playerImage,
      score,
      name,
    };

    const ranking = JSON.parse(localStorage.getItem('ranking'));

    if (ranking) {
      localStorage
        .setItem('ranking',
          JSON.stringify([...ranking, newRanking]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newRanking]));
    }
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  feedBackMessage() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const minAssertions = 3;
    return assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  goToRanking() {
    const { history } = this.props;
    history.push('/ranking');
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
      <div className="feedback-container">
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
            data-testid="header-profile-picture"
            alt={ `Name:${name}` }
          />
          <h3 data-testid="header-player-name">
            <span className="player">Pessoa jogadora:</span>
            {name}
          </h3>
          <p className="total-score" data-testid="header-score">{score}</p>
        </header>
        <div className="results">
          <h2>Results</h2>
          <p className="assertions">
            Número de acertos:
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>
          <p className="points">
            Pontuação:
            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p data-testid="feedback-text">{this.feedBackMessage()}</p>
          <div className="buttons-container">
            <button type="button" data-testid="btn-play-again" onClick={ this.playAgain }>
              Jogar Novamente
            </button>
            <button type="button" data-testid="btn-ranking" onClick={ this.goToRanking }>
              Ver Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FeedBack.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default FeedBack;
