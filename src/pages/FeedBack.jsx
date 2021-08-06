import React, { Component } from 'react';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const three = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions < three ? 'Podia ser melhor...' : 'Mandou bem!'}
        </p>
        <p data-testid="feedback-total-question">
          {assertions ? `Acertou ${assertions} perguntas` : 'Não acertou nenhuma pergunta'}
        </p>
        <Link to="/login">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar novamente
          </button>
        </Link>
      </div>);
  }
}

export default FeedBack;
