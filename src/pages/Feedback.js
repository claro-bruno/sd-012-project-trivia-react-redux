import React from 'react';
import FeedBackHeader from '../components/FeedBackHeader';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <FeedBackHeader />
      </div>
    );
  }
}

export default Feedback;
