import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerLabel from '../components/PlayerLabel';
import '../css/ranking.css';

class Ranking extends Component {
  getListRanking() {
    const rankList = JSON.parse(localStorage.getItem('ranking'));
    return rankList.sort((a, b) => b.score - a.score);
  }

  render() {
    const ranks = this.getListRanking();
    return (
      <div className="ranking-body">
        <h1>PLACAR</h1>
        <div className="FixedHeightContainer">
          <h1 data-testid="ranking-title">Ranking</h1>
          <div className="Content">
            {ranks.map((rank, index) => (<PlayerLabel
              key={ index }
              index={ index }
              player={ rank }
            />))}
          </div>
        </div>
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
