import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  // constructor() {
  //   super();

  //   // this.performanceCheck = this.performanceCheck.bind(this);
  // }

  // performanceCheck() {
  //   const state = JSON.parse(localStorage.getItem('state'));
  //   const { assertions } = state.player;
  //   const expected = 3;

  //   if (assertions < expected) {
  //     return 'Podia ser melhor...';
  //   }

  //   return 'Mandou bem!';
  // }

  render() {
    const { score, assertions } = this.props;
    const minimalGuess = 3;
    return (
      <div>
        <Header />
        {/* <h1 data-testid="feedback-text">{ this.performanceCheck() }</h1> */}
        <h1>Feedback</h1>
        <h2
          data-testid="feedback-text"
        >
          { assertions < minimalGuess ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h2>
        <div>
          <h3>Pontuação</h3>
          <p data-testid="feedback-total-score">{ score }</p>
        </div>
        <div>
          <h3>Acertos</h3>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </div>
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

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
