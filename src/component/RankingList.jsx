import React from 'react';

class RankingList extends React.Component {
  render() {
    const history = JSON.parse(localStorage.getItem('history'));
    return (
      <ol>
        { history.map((player, index) => (
          <li key={ index }>
            <img src={ player.gravatarEmail } alt="playerIMG" />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </li>
        ))}
      </ol>
    );
  }
}

export default RankingList;
