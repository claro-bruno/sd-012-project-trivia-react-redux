import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    return (
      <main className="main-ranking">
        <h1 className="title-ranking" data-testid="ranking-title">Ranking</h1>
        <table>
          <body className="body-ranking">
            {ranking.sort((a, b) => b.score - a.score)
              .map((rank, index) => (
                <tr className="resultado-ranking" key={ index }>
                  <td
                    className="name-ranking"
                    data-testid="player-name"
                  >
                    Nome:
                    {rank.name}

                  </td>
                  <td
                    className="score-ranking"
                    data-testid={ `${rank.score}${index}` }
                  >
                    Pontuação:
                    {rank.score}

                  </td>
                  <td>
                    <img
                      className="picture-ranking"
                      src={ rank.picture }
                      alt="Player's Avatar"
                    />

                  </td>
                </tr>))}
          </body>
        </table>
        <button
          className="button-ranking"
          onClick={ () => history.push('/') }
          type="button"
          data-testid="btn-go-home"
        >
          Voltar
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
