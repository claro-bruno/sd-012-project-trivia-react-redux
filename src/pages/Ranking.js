import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.playAgain = this.playAgain.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <p data-testid="ranking-title">
          Ranking
        </p>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.playAgain }
        >
          Voltar ao inicio:
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
