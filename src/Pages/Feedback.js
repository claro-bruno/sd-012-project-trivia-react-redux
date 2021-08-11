import React, { Component } from 'react';
import FeedbackMsg from '../Components/FeedbackMsg';

class Feedback extends Component {
  render() {
    return (
      <div>
        <FeedbackMsg />
        <main>
          <h2>
            Total score:
          </h2>
          <p data-testid="feedback-total-score">
            puxar do localStorage quando finailzar req 9
          </p>
          <h2>
            Total questions:
          </h2>
          <p data-testid="feedback-total-question">
            puxar do localStorage quando finailzar req 9
          </p>
        </main>
      </div>
    );
  }
}
export default Feedback;
