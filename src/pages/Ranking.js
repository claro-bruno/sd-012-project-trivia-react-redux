import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <Header />
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
