import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/ranking.css';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div className="ranking-content">
        <div className="ranking-container">
          <Link data-testid="btn-go-home" className="link" to="/">
            <i className="bi bi-house-fill" />
            {' Inicio'}
          </Link>
          <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
          {ranking.sort((a, b) => b.score - a.score)
            .map(({ picture, name, score }, index) => (
              <div key={ index } className="ranking-element">
                <img src={ picture } alt={ `${name} profile` } />
                <span
                  className="ranking-name"
                  data-testid={ `player-name-${index}` }
                >
                  { name }
                </span>
                <span
                  className="ranking-score"
                  data-testid={ `player-score-${index}` }
                >
                  { score }
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Ranking;
