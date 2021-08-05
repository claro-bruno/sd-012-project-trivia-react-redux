import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RankingPage extends Component {
  render() {
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar
          </button>
        </Link>
      </main>
    );
  }
}

export default RankingPage;
