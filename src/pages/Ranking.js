import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {
          getRanking.map((user, index) => (
            <div key={ index }>
              <img src={ user.picture } alt="user icon" />
              <p data-testid={ `player-name-${index}` }>{ user.name }</p>
              <p data-testid={ `player-score-${index}` }>{ user.score }</p>
            </div>
          ))
        }
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
