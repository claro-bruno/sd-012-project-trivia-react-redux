import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { timeReset } from '../redux/actions';
import HeaderPlayer from '../components/HeaderPlayer';

class FeedbackPage extends Component {
  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const { resetTimer } = this.props;
    const MIN_ASSERTIONS = 3;

    return (
      <>
        <HeaderPlayer />
        <h2 data-testid="feedback-text">Feedback</h2>
        <p data-testid="feedback-text">
          {assertions < MIN_ASSERTIONS
            ? 'Podia ser melhor...'
            : 'Mandou bem!'}
        </p>
        <div>
          <span>Você acertou </span>
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
        <div>
          <span>Sua pontuação foi </span>
          <span data-testid="feedback-total-score">{score}</span>
        </div>
        <Link to="/">
          <button
            type="button"
            onClick={ () => resetTimer() }
            data-testid="btn-play-again"
          >
            Jogar Novamente
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

FeedbackPage.propTypes = {
  resetTimer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetTimer: () => dispatch(timeReset()),
});

export default connect(null, mapDispatchToProps)(FeedbackPage);
