import React from 'react';
import FeedbackHeader from '../components/FeedbackHeader';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <FeedbackHeader />
      </div>
    );
  }
}

export default Feedback;
