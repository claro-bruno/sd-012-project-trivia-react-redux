import React from 'react';
import { getRanking, getAvatar } from '../utils/player';

class Ranking extends React.Component {
  render() {
    const ranking = getRanking();
    return (
      <div>
        <a className="feed-link" href="/" data-testid="btn-go-home">Voltar ao início</a>
        <h1 className="head-rank" data-testid="ranking-title">Ranking</h1>
        {ranking.map((player, index) => (
          <div className="rank-line" key={ index }>
            <img
              className="image-rank"
              alt={ player.name }
              src={ getAvatar(player.gravatarEmail) }
            />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Ranking;
