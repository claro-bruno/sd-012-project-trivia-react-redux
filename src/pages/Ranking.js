import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  getLocalStorage() {
    const pic = 'https://www.gravatar.com/avatar/';
    const ranking = [
      {
        name: 'jogador 1',
        score: 10,
        picture: pic,
      },
      {
        name: 'jogador 2',
        score: 5,
        picture: pic,
      },
      {
        name: 'jogador 3',
        score: 15,
        picture: pic,
      },
    ];
    localStorage.setItem('ranking', JSON.stringify(ranking));
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    return localRanking;
  }

  renderRanking() {
    const ranking = this.getLocalStorage();
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <ul>
          {sortedRanking.map((player, index) => (
            <li key={ index }>
              <img src={ player.picture } alt="player" />
              <span data-testid={ `player-name-${index}` }>{ player.name }</span>
              <span data-testid={ `player-score-${index}` }>{ player.score }</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderHomeBtn() {
    return (
      <Link to="/">
        <button type="button" data-testid="btn-go-home">
          Inicio
        </button>
      </Link>
    );
  }

  render() {
    return (
      <div>
        {this.renderRanking()}
        {this.renderHomeBtn()}
      </div>
    );
  }
}

export default Ranking;
