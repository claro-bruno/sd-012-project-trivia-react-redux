import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Ranking from './Ranking';

class Feedback extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    const { assertions } = player;
    const tres = 3;
    let mensagem = '';
    if (assertions < tres) mensagem = 'Podia ser melhor...';
    else if (assertions >= tres) mensagem = 'Mandou bem!';
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <span data-testid="header-score">{ state.player.score }</span>
        <span data-testid="feedback-total-score">{ state.player.score }</span>
        <span data-testid="feedback-total-question">{ state.player.assertions }</span>
        <span data-testid="feedback-text">{ mensagem }</span>
        <button type="button" data-testid="btn-play-again">
          <Link to="/">Jogar novamente</Link>
        </button>
        <button type="button" data-testid="btn-ranking">
          <Link to="/ranking">Ver Ranking</Link>
        </button>
        <Ranking />
      </div>
    );
  }
}

export default Feedback;
