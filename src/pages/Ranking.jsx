import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.setRanking = this.setRanking.bind(this);
  }

  componentDidMount() {
    this.setRanking();
  }

  setRanking() {
    const player1 = JSON.parse(localStorage.getItem('state')).player;
    const { name, score, gravatarEmail } = player1;
    const hash = md5(gravatarEmail).toString().toLowerCase();
    const urlImg = `https://www.gravatar.com/avatar/${hash}`;
    const ranking = {
      name,
      score,
      urlImg,
    };
    localStorage.setItem('ranking', JSON.stringify([ranking]));
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const rankingOrder = ranking.sort((a, b) => b.score - a.score);
    return (
      <main>
        <h1 data-testid="ranking-title">RANKING</h1>
        <ol>
          { rankingOrder.map((player, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
              {console.log(player.score)}
              <img src={ player.urlImg } alt="Foto do player" />
            </li>
          ))}
        </ol>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Home
          </button>
        </Link>
      </main>
    );
  }
}

export default Ranking;
