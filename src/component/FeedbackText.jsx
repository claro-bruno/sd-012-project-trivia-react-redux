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
        <>
          <span><i className="fas fa-sad-tear" /></span>
          <h1 data-testid="feedback-text" className="bad-message">Podia ser melhor...</h1>
        </>
      );
    } return (
      <>
        <i className="fas fa-laugh-beam" />
        <h1 data-testid="feedback-text" className="good-message">Mandou bem!</h1>
      </>
    );
  }
}

export default FeedbackMessage;
