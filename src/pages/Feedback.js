import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  render() {
    const ASSERTIONS_CHECK = 3;
    const { assertions, score } = this.props;

    return (
      <div>
        <h2 data-testid="feedback-text">
          {
            assertions < ASSERTIONS_CHECK ? 'Podia ser melhor...' : 'Mandou bem!'
          }
        </h2>
        <div>
          <h3 data-testid="feedback-total-score">
            { score }
          </h3>
          <h3 data-testid="feedback-total-question">
            { assertions }
          </h3>
        </div>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/game/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
