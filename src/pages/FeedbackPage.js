import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import HeaderPlayer from '../components/HeaderPlayer';
import { timeReset } from '../redux/actions';

class FeedbackPage extends Component {
  componentDidMount() {
    const { player: { name, score, email } } = JSON.parse(localStorage.getItem('state'));
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;

    const newRank = {
      name,
      score,
      picture,
    };
    const prevRanking = JSON.parse(localStorage.getItem('ranking'));

    if (prevRanking) {
      localStorage.setItem('ranking', JSON.stringify([...prevRanking, newRank]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newRank]));
    }
  }

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
