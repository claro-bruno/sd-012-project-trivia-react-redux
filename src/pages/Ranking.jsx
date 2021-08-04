import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const rankingOrder = ranking.sort((a, b) => b.score - a.score);
    // console.log(ranking);

    return (
      <main>
        <h1 data-testid="ranking-title">RANKING</h1>
        <ol>
          { rankingOrder.map((player, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
              <img src={ player.img } alt="Foto do player" />
            </li>
          ))}
        </ol>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Configurações
          </button>
        </Link>
      </main>
    );
  }
}

export default Ranking;
