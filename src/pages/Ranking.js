import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  getRankingPlayers() {
    return JSON.parse(localStorage.getItem('ranking'));
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">
          Ranking:
        </h1>
        <ol>
          {
            this.getRankingPlayers().map((player, index) => (
              <li key={ index }>
                <img
                  src={ player.picture }
                  alt="gravatar"
                />
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </li>
            ))
          }
        </ol>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Início
        </button>
      </>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
