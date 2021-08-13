import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history: { push } } = this.props;
    const players = JSON.parse(localStorage.ranking)
      .sort((a, b) => (
        b.score - a.score
      ));

    return (
      <fieldset className="App">
        <legend>
          <h2 data-testid="ranking-title">Ranking</h2>
        </legend>
        {players
          .map(({ name, picture, score }, i) => (
            <div key={ i }>
              <span>{i + 1}</span>
              <span>{' - '}</span>
              <img src={ picture } alt="Imagem do Jogador" />
              <span data-testid={ `player-name-${i}` }>{name}</span>
              <span>{' - '}</span>
              <span data-testid={ `player-score-${i}` }>{score}</span>
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
