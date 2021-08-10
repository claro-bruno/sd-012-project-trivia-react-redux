import React, { Component } from 'react';
import PlayAgainButton from '../components/PlayAgainButton';
import RankingButton from '../components/RankingButton';
import UserProfile from '../components/UserProfile';

export default class extends Component {
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

    return (
      <div>
        <UserProfile />
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
      </div>
    );
  }
}
