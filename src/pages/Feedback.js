import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedbackHeader from '../components/FeedbackHeader';
import ButtonRanking from '../components/ButtonRanking';

class Feedback extends React.Component {
  constructor() {
    super();

    this.rankingBtn = this.rankingBtn.bind(this);
  }

  rankingBtn() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { history, assertions, score } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <FeedbackHeader />
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3 data-testid="feedback-total-question">{assertions}</h3>
        <ButtonRanking
          itemName="Ver Ranking"
          testId="btn-ranking"
          onClick={ this.rankingBtn }
        />
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
