import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Style/ranking.css';

class Ranking extends Component {
  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking-screen">
        <h2 id="ranking-title" data-testid="ranking-title">Ranking</h2>
        {
          getRanking.map((user, index) => (
            <div key={ index }>
              <div className="ranking-player">
                <img className="ranking-img" src={ user.picture } alt="user icon" />
                <p
                  className="ranking-name"
                  data-testid={ `player-name-${index}` }
                >
                  { user.name }
                </p>
                <p
                  className="ranking-score"
                  data-testid={ `player-score-${index}` }
                >
                  { user.score }
                </p>
              </div>
            </div>
          ))
        }
        <Link to="/">
          <button
            className="btn-home"
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
