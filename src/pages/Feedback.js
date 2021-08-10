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
      <section>
        <section>
          <img
            className="player-img"
            data-testid="header-profile-picture"
            src={ userFeedback.hash }
            alt={ `${userFeedback.name}` }
          />
          <span data-testid="header-player-name">{ userFeedback.name }</span>
          <span data-testid="header-score">{ userFeedback.score }</span>
        </section>
        <h1 data-testid="feedback-text">{ this.alertScore() }</h1>
        <h2 data-testid="feedback-total-score">
          { player.score }
          {' '}
          pontos
        </h2>
        <h3 data-testid="feedback-total-question">
          { player.assertions }
          {' '}
          acerto(s)
        </h3>
        <PlayAgainButton />
        <RankingButton />
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
