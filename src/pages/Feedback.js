import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.performanceCheck = this.performanceCheck.bind(this);
  }

  performanceCheck() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { assertions } = state.player;
    const expected = 3;

    if (assertions < expected) {
      return 'Podia ser melhor...';
    }

    return 'Mandou bem!';
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ this.performanceCheck() }</h1>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
