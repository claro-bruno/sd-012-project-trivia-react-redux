import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../game/Header';
import { FeedbackText, FeedbackP, FeedbackWrapper } from './styles';
import { Button } from '../globalStyles';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalScore: props.totalScore,
      totalAssertions: props.totalAssertions,
    };
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  renderFeedback() {
    const scoreToBeat = 3;
    const { totalAssertions } = this.state;
    if (totalAssertions < scoreToBeat) {
      return (
        <FeedbackText data-testid="feedback-text">Podia ser melhor...</FeedbackText>
      );
    }
    return (
      <FeedbackText data-testid="feedback-text">Mandou bem!</FeedbackText>
    );
  }

  render() {
    const { totalScore, totalAssertions } = this.state;
    return (
      <>
        <Header />
        <FeedbackWrapper>
          { this.renderFeedback() }
          <FeedbackP data-testid="feedback-total-question">
            Você acertou
            {' '}
            {totalAssertions}
            {' '}
            questões !
          </FeedbackP>
          <FeedbackP data-testid="feedback-total-score">
            Um total de
            {' '}
            {totalScore}
            {' '}
            pontos !
          </FeedbackP>
          <Link to="/" style={ { textDecoration: 'none' } }>
            <Button
              style={ { width: '100%', padding: '0.5vw' } }
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente
            </Button>
          </Link>
          <Link to="/ranking" style={ { textDecoration: 'none' } }>
            <Button
              data-testid="btn-ranking"
              type="button"
              style={ { width: '100%', padding: '0.5vw', backgroundColor: '#8968A3' } }
            >
              Ranking
            </Button>
          </Link>
        </FeedbackWrapper>
      </>
    );
  }
}

Feedback.propTypes = {
  totalScore: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  totalScore: state.scoreReducer.totalScore,
  totalAssertions: state.scoreReducer.totalAssertions,
});

export default connect(mapStateToProps)(Feedback);
