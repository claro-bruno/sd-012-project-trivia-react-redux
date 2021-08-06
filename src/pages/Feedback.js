import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedBackHeader from '../components/FeedBackHeader';

class Feedback extends React.Component {
  render() {
    const { history, assertions, score } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <FeedBackHeader />
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3 data-testid="feedback-total-question">{assertions}</h3>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape(Object).isRequired,
  assertions: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.assertionsReducer.assertions,
  score: state.scoreReducer.score,
});

export default connect(mapStateToProps)(Feedback);
