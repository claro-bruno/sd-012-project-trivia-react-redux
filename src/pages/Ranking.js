import React, { Component } from 'react';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.getRanking = this.getRanking.bind(this);
    this.dataPlayer = this.dataPlayer.bind(this);
  }

  getRanking() {
    const rankingSaved = JSON.parse(localStorage.getItem('ranking'));
    return (rankingSaved.sort((a, b) => b.score - a.score));
  }

  dataPlayer(player, index) {
    return (
      <li key={ index }>
        <img scr={ `${player.picture}` } alt={ `${player.name}` } />
        <span data-testid={ `player-name-${index}` }>{ player.name }</span>
        <span data-testid={ `player-score-${index}` }>{ player.score }</span>
      </li>
    );
  }

  render() {
    const ranking = this.getRanking();
    console.log('no render. antes do map', ranking);
    return (
      <div>
        <ol>
          { ranking.map((player, index) => this.dataPlayer(player, index)) }
        </ol>
        <button type="button" data-testid="btn-go-home">Home</button>
      </div>
    );
  }
}

export default Ranking;
