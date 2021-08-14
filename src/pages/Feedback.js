import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayAgainButton from '../components/PlayAgainButton';
import RankingButton from '../components/RankingButton';

class Feedback extends Component {
  constructor() {
    super();
    this.alertScore = this.alertScore.bind(this);
  }

  alertScore() {
    const getAssertion = JSON.parse(localStorage.getItem('state'));
    const { player } = getAssertion;
    const { assertions } = player;
    const number = 3;

    if (assertions < number) {
      return ('Podia ser melhor...');
    }
    return ('Mandou bem!');
  }

  render() {
    const getAssertion = JSON.parse(localStorage.getItem('state'));
    const { player } = getAssertion;
    const { userFeedback } = this.props;
    return (
      <section className="feedback-section">
        <section className="header-player">
          <img
            className="player-img"
            data-testid="header-profile-picture"
            src={ userFeedback.hash }
            alt={ `${userFeedback.name}` }
          />
          <span
            className="header-name"
            data-testid="header-player-name"
          >
            { userFeedback.name }
          </span>
          <span
            className="header-score"
            data-testid="header-score"
          >
            { userFeedback.score }
          </span>
        </section>
        <section className="feedback-result">
          <h1 className="main-text" data-testid="feedback-text">
            { this.alertScore() }
          </h1>
          <h2 className="text" data-testid="feedback-total-score">
            { `${player.score} pontos` }
          </h2>
          <h3 className="text" data-testid="feedback-total-question">
            { `${player.assertions} acerto(s)` }
          </h3>
          <section className="feedback-btns">
            <PlayAgainButton />
            <RankingButton />
          </section>
        </section>
      </section>
    );
  }
}

Feedback.propTypes = {
  userFeedback: PropTypes.objectOf(
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  userFeedback: state.user,
});

export default connect(mapStateToProps)(Feedback);
