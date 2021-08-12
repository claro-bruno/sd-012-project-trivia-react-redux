import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const avarage = 3;
    return (
      <section className="fieldset-question">
        <Header />
        <h2
          data-testid="feedback-text"
        >
          { assertions >= avarage ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h2>
        <p
          data-testid="feedback-total-score"
        >
          Pontuação Total:
          { ` ${score}` }
        </p>
        <p
          data-testid="feedback-total-question"
        >
          Número de Acertos:
          { ` ${assertions}` }
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
      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
};

Feedback.defaultProps = {
  score: 0,
  assertions: 0,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
