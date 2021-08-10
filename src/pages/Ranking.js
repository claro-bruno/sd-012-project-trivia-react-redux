import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.sort((a, b) => b.score - a.score)
          .map(({ picture, name, score }, index) => (
            <div key={ index }>
              <img src={ picture } alt={ `${name} profile` } />
              <span data-testid={ `player-name-${index}` }>{name}</span>
              <span data-testid={ `player-score-${index}` }>{score}</span>
            </div>
          ))}
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Inicio</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
