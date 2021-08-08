import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ResultsInfo extends React.Component {
  render() {
    const { totalScore, totalQuestions } = this.props;
    return (
      <section>
        <h2 data-testid="feedback-total-score">
          { totalScore }
        </h2>
        <h2 data-testid="feedback-total-question">
          { totalQuestions }
        </h2>
      </section>
    );
  }
}

ResultsInfo.propTypes = {
  totalScore: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  totalScore: state.game.score,
  totalQuestions: state.game.assertions,
});

export default connect(mapStateToProps)(ResultsInfo);
