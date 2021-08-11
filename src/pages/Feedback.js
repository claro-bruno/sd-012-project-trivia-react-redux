import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const THREE_ASSERTIONS = 3;
    return (
      <>
        <Header />
        <div className="feedback-board">
          <div className="feed-mess-head">
            <h1 className="feed-heading" data-testid="feedback-text">
              {
                assertions < THREE_ASSERTIONS
                  ? 'Podia ser melhor...'
                  : 'Mandou bem!'
              }
            </h1>
            <p className="feed-message">
              Você acertou
              {' '}
              <span data-testid="feedback-total-question">{assertions}</span>
              {' '}
              perguntas e somou
              {' '}
              <span data-testid="feedback-total-score">{score}</span>
              {' '}
              pontos!
            </p>
          </div>
          <Link
            className="feed-link"
            to="/ranking"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </Link>
          <a
            href="/"
            data-testid="btn-play-again"
            className="feed-link"
          >
            Jogar novamente
          </a>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.gameReducer.currentScore,
  assertions: state.gameReducer.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
