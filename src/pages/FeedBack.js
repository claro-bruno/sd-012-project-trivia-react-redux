import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Login.css';

class Feedback extends Component {
  feedbackOfAssertions() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = player;
    const minAssertions = 3;

    if (assertions === 0) {
      return (
        <div>
          <p>Não acertou nenhuma pergunta</p>
          <p className="feedBack">
            Pontuação:

            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p className="feedBack">
            Acertos:
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>
          <p data-testid="feedback-text">Podia ser melhor...</p>
        </div>
      );
    }
    return (

      <div>
        <p className="feedBack">
          Pontuação:
          {' '}
          <span data-testid="feedback-total-score">{parseInt(score, 10)}</span>

        </p>
        <p className="feedBack">
          Acertos:
          {' '}
          <span data-testid="feedback-total-question">{parseInt(assertions, 10)}</span>
        </p>
        <p data-testid="feedback-text" className="feedBack">
          { assertions >= minAssertions ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        { this.feedbackOfAssertions() }
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
