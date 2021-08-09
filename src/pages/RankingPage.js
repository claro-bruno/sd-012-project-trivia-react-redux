import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RankingPage extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>

        {ranking
          .sort((a, b) => b.score - a.score)
          .map(({ name, score, picture }, index) => (
            <div key={ index }>
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
              <img src={ picture } alt={ name } />
            </div>
          ))}

        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar
          </button>
        </Link>
      </main>
    );
  }
}

export default RankingPage;
