import React, { Component } from 'react';
import { TiHome } from 'react-icons/ti';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const scoreBoard = JSON.parse(localStorage.getItem('ranking'));
    const rankingBoard = scoreBoard.sort((a, b) => b.score - a.score);
    return (
      <section className="ranking-section">
        <h2 className="main-text" data-testid="ranking-title">Ranking</h2>
        <ul className="ranking-list">
          { rankingBoard.map((ranking, index) => (
            <li className="players-list" key={ index }>
              <img className="player-img" src={ ranking.picture } alt={ ranking.name } />
              <p className="score-text-name" data-testid={ `player-name-${index}` }>
                { ranking.name }
              </p>
              <p
                className="score-text"
                data-testid={ `player-score-${index}` }
              >
                { ranking.score }
              </p>
            </li>
          )) }
        </ul>
        <Link to="/">
          <button
            className="home-btn"
            type="button"
            data-testid="btn-go-home"
          >
            <TiHome />
          </button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
