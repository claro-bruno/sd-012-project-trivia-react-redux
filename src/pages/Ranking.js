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
              <div id="ranking-player">
                <img id="ranking-img" src={ user.picture } alt="user icon" />
                <p
                  id="ranking-name"
                  data-testid={ `player-name-${index}` }
                >
                  { user.name }
                </p>
                <p
                  id="ranking-score"
                  data-testid={ `player-score-${index}` }
                >
                  { user.score }
                </p>
              </div>
            </div>
          ))
        }
        <Link to="/">
          <button id="btn-go-home" type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
