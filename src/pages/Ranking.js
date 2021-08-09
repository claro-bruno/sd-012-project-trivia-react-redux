import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();

    this.setRanking = this.setRanking.bind(this);
  }

  setRanking() {
    const player = this.getPlayerInfo();

    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) ranking = [];
    ranking.push({
      name: player.name,
      score: player.score,
      profilePicture: player.profilePicture,
    });
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  getPlayerInfo() {
    const state = JSON.parse(localStorage.getItem('state'));
    const profilePicture = localStorage.getItem('profilePicture');
    const playerInfo = { ...state.player, profilePicture };
    return playerInfo;
  }

  render() {
    this.setRanking();
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.sort((a, b) => b.score - a.score).map((rank, index) => (
          <ol key={ index }>
            <li>
              <span data-testid={ `player-name-${index}` }>{rank.name}</span>
              <span data-testid={ `player-score-${index}` }>{rank.score}</span>
              <img src={ `${rank.profilePicture}` } alt={ `${rank.name} profile` } />
            </li>
          </ol>
        ))}
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Inicio</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
