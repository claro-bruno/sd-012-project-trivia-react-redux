import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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
      redirect: false,
    };
    this.setMessage = this.setMessage.bind(this);
    this.redirectLogin = this.redirectLogin.bind(this);
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

  redirectLogin() {
  this.setState({ redirect: true });
  }

  render() {
    const { score, message, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <section>
        <Header score={ score } />
        <p data-testid="feedback-text">{message || 'Loading'}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectLogin }
        >
          Jogar Novamente
        </button>
      </section>
    );
  }
}

export default Feedback;
