import React, { Component } from 'react';
import FeedbackMsg from '../Components/FeedbackMsg';
import HeaderGame from '../Components/HeaderGame';
import ButtonRanking from '../Components/ButtonRanking';
import ButtonAgain from '../Components/ButtonAgain';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      assertions: 0,
    };
    this.getResult = this.getResult.bind(this);
  }

  componentDidMount() {
    this.getResult();
  }

  getResult() {
    const result = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = result;
    this.setState({ score, assertions });
  }

  render() {
    const { score, assertions } = this.state;
    return (
      <div>
        <HeaderGame score={ score } />
        <FeedbackMsg assertions={ assertions } />
        <main>
          <h2>
            Total score:
          </h2>
          <p data-testid="feedback-total-score">
            { score }
          </p>
          <h2>
            Total questions:
          </h2>
          <p data-testid="feedback-total-question">
            { assertions }
          </p>
          <ButtonRanking />
          <ButtonAgain />
        </main>
      </div>
    );
  }
}
export default Feedback;
