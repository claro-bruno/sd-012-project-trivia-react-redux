import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score, correctAnswers } = this.props;
    const avarage = 3;
    return (
      <>
        <Header />
        <h2
          data-test-id="feedback-text"
        >
          { score < avarage ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h2>
        <p
          data-testid="feedback-total-score"
        >
          { `Sua pontuação é ${score}` }
        </p>
        <p
          data-testid="feedback-total-question"
        >
          { `Você acertou ${correctAnswers} perguntas` }
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.feedback.score,
  correctAnswers: state.feedback.correctAnswers,
});

export default connect(mapStateToProps)(Feedback);
