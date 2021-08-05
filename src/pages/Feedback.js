import React from 'react';
import Header from '../components/Header';
import FeedbackMessage from '../components/FeedbackMessage';
import ResultsInfo from '../components/ResultsInfo';

class Feedback extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <FeedbackMessage />
        <ResultsInfo />
      </section>
    );
  }
}

export default Feedback;
