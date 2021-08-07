import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const playerRanking = JSON.parse(localStorage.getItem('ranking'));
    const ranking = playerRanking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <ol>
          { ranking.map((user, index) => (
            <li key={ index }>
              <img src={ user.image } alt="Foto" />
              <p data-testid={ `player-name-${index}` }>{ user.name }</p>
              <p data-testid={ `player-score-${index}` }>{ user.score }</p>
            </li>))}
        </ol>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Tela de preenchimento dos dados
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
