import React from 'react';
import FeedbackText from '../component/FeedbackText';
import FeedbackInfo from '../component/FeedbackInfo';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <FeedbackText />
        <FeedbackInfo />
      </div>
    );
  }
}

export default Feedback;
