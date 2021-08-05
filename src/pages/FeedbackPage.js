import React, { Component } from 'react';
import HeaderPlayer from '../components/HeaderPlayer';

class FeedbackPage extends Component {
  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const MIN_ASSERTIONS = 3;

    return (
      <>
        <HeaderPlayer />
        <h2 data-testid="feedback-text">Feedback</h2>
        <p data-testid="feedback-text">
          {assertions < MIN_ASSERTIONS
            ? 'Podia ser melhor...'
            : 'Mandou bem!'}
        </p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-total-score">{score}</p>
      </>
    );
  }
}

export default FeedbackPage;
