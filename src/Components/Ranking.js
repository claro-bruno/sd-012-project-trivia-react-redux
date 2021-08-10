import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table>
          <tbody>
            {ranking.sort((a, b) => b.score - a.score)
              .map((rank, index) => (
                <tr key={ index }>
                  <td data-testid="player-name">{rank.name}</td>
                  <td data-testid={ `${rank.score}${index}` }>{rank.score}</td>
                  <td><img src={ rank.picture } alt="Player's Avatar" /></td>
                </tr>))}
          </tbody>
        </table>
        <button
          onClick={ () => history.push('/') }
          type="button"
          data-testid="btn-go-home"
        >
          Voltar
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
