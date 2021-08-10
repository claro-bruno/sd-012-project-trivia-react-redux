import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Score from '../Components/Score';

const minAssertionsForPositiveFeedback = 3;

class Feedback extends Component {
  render() {
    const { assertions, history } = this.props;
    return (
      <>
        <h1
          data-testid="feedback-text"
        >
          {assertions < minAssertionsForPositiveFeedback
            ? 'Podia ser melhor...'
            : 'Mandou bem!'}
        </h1>
        <Header />
        <Score dataTestId="header-score" />
        {/* O requisito 12 o teste procura por este Id */}
        <Score dataTestId="feedback-total-score" />
        {/* O requisito 14 o teste procura por este Id */}
        <h1
          data-testid="feedback-total-question"
        >
          {assertions}
        </h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <Link data-testid="btn-ranking" to="/ranking">Ranking</Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.user.assertions,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
