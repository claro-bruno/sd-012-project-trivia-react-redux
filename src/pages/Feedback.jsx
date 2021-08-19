import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const average = 3;
    const good = 'Mandou bem!';
    const bad = 'Podia ser melhor...';

    return (
      <>
        <Header />
        <span data-testid="feedback-text">
          {assertions < average ? bad : good}
        </span>
        <span data-testid="feedback-total-score">
          {score}
        </span>
        <span data-testid="feedback-total-question">{ assertions }</span>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play again!
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.login.score,
  assertions: state.login.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
