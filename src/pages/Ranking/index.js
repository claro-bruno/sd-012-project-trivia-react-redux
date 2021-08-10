import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const savedRanking = JSON.parse(localStorage.getItem('ranking'));
    const ranking = !savedRanking ? [] : savedRanking;
    ranking.sort((a, b) => b.score - a.score);
    return (
      <div>

        <h2 data-testid="ranking-title">Ranking</h2>
        {

          ranking.map(({ picture, name, score }, index) => (
            <div key={ index + score }>
              <img
                src={ `https://www.gravatar.com/avatar/${picture}` }
                alt="img-user"
              />
              <span data-testid={ `player-name-${index}` }>{ name }</span>
              <span data-testid={ `player-score-${index}` }>{ score }</span>

            </div>
          ))
        }

        <Link to="/">
          <button
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
