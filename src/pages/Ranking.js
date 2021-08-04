import React from 'react';
import getRanking from '../utils/player';

class Ranking extends React.Component {
  render() {
    const ranking = getRanking();
    return (
      <div>
        <a href="/" data-testid="btn-go-home">Voltar ao início</a>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((player, index) => (
          <div key={ index }>
            <img alt={ player.name } src={ player.gravatarEmail } />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Ranking;
