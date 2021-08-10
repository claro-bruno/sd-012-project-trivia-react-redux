import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = player;
    const minAssertions = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertions >= minAssertions ? 'Mandou bem!' : 'Podia ser melhor...!' }
        </p>
        <p data-testid="feedback-total-score">
          { parseInt(score, 10) }
        </p>
        <p data-testid="feedback-total-question">
          { parseInt(assertions, 10) }
        </p>
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

const mapStateToProps = (state) => ({
  assertions: state.user.assertions,
  score: state.user.score,
});

export default connect(mapStateToProps)(Feedback);
