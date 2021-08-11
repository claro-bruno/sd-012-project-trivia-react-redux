import React from 'react';
import './Ranking.css';

class RankingList extends React.Component {
  render() {
    const history = JSON.parse(localStorage.getItem('history'));
    return (
      <ol className="ranking">
        { history.map((player, index) => (
          <li key={ index } className="ranking-item">
            <img src={ player.gravatarEmail } alt="playerIMG" />
            <h4 data-testid={ `player-name-${index}` }>{ player.name }</h4>
            <h4
              className="score"
              data-testid={ `player-score-${index}` }
            >
              { player.score }
            </h4>
          </li>
        ))}
      </ol>
    );
  }
}

export default RankingList;
