import React from 'react';

class FeedbackMessage extends React.Component {
  constructor() {
    super();
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const assertionsNumber = parseInt(assertions, 10);
    this.state = {
      assertions: assertionsNumber,
    };
  }

  render() {
    const { assertions } = this.state;
    const cases = 3;
    if (assertions < cases) {
      return (
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
      );
    } return (
      <h1 data-testid="feedback-text">Mandou bem!</h1>
    );
  }
}

export default FeedbackMessage;
