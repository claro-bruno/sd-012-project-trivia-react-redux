import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    const pullScore = localStorage.getItem('state');
    const finalScore = JSON.parse(pullScore).player.score;
    const { assertions } = JSON.parse(pullScore).player;
    this.state = {
      score: finalScore,
      assertions,
      message: '',
    };
    this.setMessage = this.setMessage.bind(this);
  }

  componentDidMount() {
    this.setMessage();
  }

  setMessage() {
    const { assertions } = this.state;
    const minAssertions = 3;
    if (assertions < minAssertions) {
      this.setState({
        message: 'Podia ser melhor...',
      });
    } else {
      this.setState({
        message: 'Mandou bem!',
      });
    }
  }

  render() {
    const { score, message } = this.state;
    return (
      <section>
        <Header score={ score } />
        <p data-testid="feedback-text">{message || 'Loading'}</p>

      </section>
    );
  }
}

export default Feedback;
