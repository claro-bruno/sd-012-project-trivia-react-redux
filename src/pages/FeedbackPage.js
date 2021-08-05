import React, { Component } from 'react';
import HeaderPlayer from '../components/HeaderPlayer';

class FeedbackPage extends Component {
  render() {
    return (
      <>
        <HeaderPlayer />
        <h2 data-testid="feedback-text">Feedback</h2>
      </>
    );
  }
}

export default FeedbackPage;
