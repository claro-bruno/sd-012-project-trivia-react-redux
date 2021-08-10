import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = getRanking.sort((a, b) => b.score - a.score);
    return (
      <section>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ul>
          {sortRanking.map((e, index) => (
            <li key={ e.picture }>
              <img src={ e.picture } alt="player pic" />
              {' '}
              <p data-testid={ `player-name-${index}` }>{e.name}</p>
              {' '}
              <p data-testid={ `player-score-${index}` }>{e.score}</p>
            </li>
          ))}
        </ul>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Inicio</button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
