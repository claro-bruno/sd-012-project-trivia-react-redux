import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const scoreBoard = JSON.parse(localStorage.getItem('ranking'));
    const rankingBoard = scoreBoard.sort((a, b) => b.score - a.score);
    return (
      <section>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ul>
          { rankingBoard.map((ranking, index) => (
            <li key={ index }>
              <img src={ ranking.picture } alt={ ranking.name } />
              <p data-testid={ `player-name-${index}` }>{ ranking.name }</p>
              <p data-testid={ `player-score-${index}` }>{ ranking.score }</p>
            </li>
          )) }
        </ul>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Inicio
          </button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
