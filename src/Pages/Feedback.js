import React, { Component } from 'react';

class Feedback extends Component {
  render() {
    return (
      <main>
        <p data-testid='feedback-total-score'>
          Total score: {}
        </p>
        <p data-testid='feedback-total-question'>
          Total questions: {}
        </p>
      </main>
    );
  }
}

export default Feedback;
