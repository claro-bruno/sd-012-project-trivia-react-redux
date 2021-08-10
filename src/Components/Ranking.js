import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table>
          <tbody>
            {ranking.sort((a, b) => b.score - a.score)
              .map((rank, index) => (
                <tr key={ index }>
                  {/* <td data-testid={ `${rank.name}${index}` }>{rank.name}</td> */}
                  <td data-testid="player-name">{rank.name}</td>
                  <td data-testid={ `${rank.score}${index}` }>{rank.score}</td>
                  <td><img src={ rank.picture } alt="avatar_de_usuário" /></td>
                </tr>))}
          </tbody>
        </table>
        <button
          onClick={ () => history
            .push('/') }
          type="button"
          data-testid="btn-go-home"
        >
          Voltar
        </button>
      </div>
    );
  }
}
const mapStatetoProps = (state) => ({
  email: state.user.email,
  nome: state.user.name,
  pontuacao: state.user.score,

});
Ranking.propTypes = {
  history: PropTypes.string.isRequired,

};

export default connect(mapStatetoProps)(Ranking);
