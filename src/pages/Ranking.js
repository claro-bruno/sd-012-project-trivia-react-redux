import React from 'react';
import PropTypes from 'prop-types';
import './ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();
    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div className="ranking">
        <p className="title" data-testid="ranking-title">
          Ranking
        </p>
        <div className="players-container">
          {ranking
            .sort((a, b) => b.score - a.score)
            .map((rank, index) => (
              <div className="players" key={ index }>
                <img src={ rank.playerImage } alt="player" />
                <h3 data-testid={ `player-name-${index}` }>{rank.name}</h3>
                <p data-test-id={ `player-score-${index}` }>
                  Pontuação:
                  <span className="score">{rank.score}</span>
                </p>
              </div>
            ))}
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.playAgain }
        >
          Voltar ao inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
