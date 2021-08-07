import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerLabel from '../components/PlayerLabel';

class Ranking extends Component {
  getListRanking() {
    const rankList = JSON.parse(localStorage.getItem('ranking'));
    return rankList.sort((a, b) => b.score - a.score);
  }

  render() {
    const ranks = this.getListRanking();
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranks.map((rank, index) => (<PlayerLabel
          key={ index }
          index={ index }
          player={ rank }
        />))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
