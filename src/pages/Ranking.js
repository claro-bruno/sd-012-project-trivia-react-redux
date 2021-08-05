import React from 'react';

class Ranking extends React.Component {

  getLocalStorage() {
    const ranking = [
      {
        name: 'jogador 1',
        score: 10,
        picture: 'https://www.gravatar.com/avatar/',
      },
      {
        name: 'jogador 2',
        score: 5,
        picture: 'https://www.gravatar.com/avatar/',
      },
      {
        name: 'jogador 3',
        score: 15,
        picture: 'https://www.gravatar.com/avatar/',
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
          {sortedRanking.map((player, index) => 
          <li key={index}>
            <img src={player.picture} alt="player"></img>
            <span data-testid={`player-name-${index}`}>{player.name}</span>
            <span data-testid={`player-score-${index}`}>{player.score}</span>
          </li>)}
        </ul>
      </div>
    )
  }

  render() {
    return (
    <div>
      {this.renderRanking()}
    </div>
    );
  }
}

export default Ranking;
