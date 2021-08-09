import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <p data-testid="ranking-title">Ranking</p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar ao início
          </button>
        </Link>
      </>
    );
  }
}

export default Ranking;
