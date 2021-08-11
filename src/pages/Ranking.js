import React from 'react';
import { Link } from 'react-router-dom';
import './ranking.css';

class Ranking extends React.Component {
  getLocalStorage() {
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    return localRanking;
  }

  renderRanking() {
    const ranking = this.getLocalStorage();
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div className="container-lista-ranking">
        <ul className="lista-ranking">
          {sortedRanking.map((player, index) => (
            <li key={ index }>
              <img src={ player.picture } alt="player" />
              <span data-testid={ `player-name-${index}` }>{ player.name }</span>
              <span data-testid={ `player-score-${index}` }>{ player.score }</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderHomeBtn() {
    return (
      <Link to="/">
        <button
          className="btn-ranking-play"
          type="button"
          data-testid="btn-go-home"
        >
          Inicio
        </button>
      </Link>
    );
  }

  render() {
    return (
      <div className="container-ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        {this.renderRanking()}
        {this.renderHomeBtn()}
      </div>
    );
  }
}

export default Ranking;
