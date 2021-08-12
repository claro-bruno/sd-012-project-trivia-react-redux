import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../pages/Feedback.module.css';

class ResultsInfo extends React.Component {
  render() {
    const { totalScore, totalQuestions } = this.props;
    return (
      <section>
        <div className={ styles.scoreContainer }>
          <h2>Score:</h2>
          <h2
            data-testid="feedback-total-score"
            className={ styles.score }
          >
            { totalScore }
          </h2>
        </div>
        <div className={ styles.questionContainer }>
          <h2>Correct Answers:</h2>
          <h2
            data-testid="feedback-total-question"
            className={ styles.question }
          >
            { totalQuestions }
          </h2>
        </div>
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
