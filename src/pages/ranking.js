import PropTypes from 'prop-types';
import React from 'react';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1>Ranking aqui</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
