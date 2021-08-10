import React from 'react';

class FeedbackInfo extends React.Component {
  constructor(props) {
    super(props);
    const { player: { score, assertions } } = JSON.parse(localStorage.getItem('state'));
    const assertionsNumber = parseInt(assertions, 10);
    const scoreNumber = parseInt(score, 10);
    this.state = {
      assertions: assertionsNumber,
      score: scoreNumber,
    };
  }

  render() {
    const { assertions, score } = this.state;
    return (
      <div className="feedbackInfo">
        <h3 data-testid="feedback-total-score">{ score }</h3>
        <h3 data-testid="feedback-total-question">{ assertions }</h3>
      </div>
    );
  }
}

export default FeedbackInfo;
