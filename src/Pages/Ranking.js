import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const toKeys = Object.keys;
    const local = localStorage;
    const { history: { push } } = this.props;

    const names = toKeys(local).filter((key) => /player-name-\d+/.test(key)).sort();
    const scores = toKeys(local).filter((key) => /player-score-\d+/.test(key)).sort();

    const players = names.map((_, i) => [local[names[i]], parseInt(local[scores[i]], 0)]);

    return (
      <fieldset>
        <legend>
          <h2 data-testid="ranking-title">Ranking</h2>
        </legend>
        {players
          .sort((a, b) => b[1] - a[1])
          .map(([player, score], i) => (
            <div key={ i }>
              <span>{`${i + 1}° - `}</span>
              <span data-testid={ `player-name-${i}` }>{`${player} - `}</span>
              <span data-testid={ `player-score-${i}` }>{`${score} Pontos`}</span>
            </div>
          ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => push('/') }
        >
          Início
        </button>
      </fieldset>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.arrayOf().isRequired,
  push: PropTypes.func.isRequired,
};

export default Ranking;
