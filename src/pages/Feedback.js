import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

const ASSERTION_AVERAGE = 3;

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleRanking = this.handleRanking.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);

    this.state = {
      stateRedirect: false,
    };
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleRanking() {
    const storedRank = localStorage.getItem('ranking');
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { name, score, gravatarEmail } } = state;
    if (!storedRank) {
      const updateRank = [{
        name,
        score,
        picture: gravatarEmail,
      }];
      localStorage.setItem('ranking', JSON.stringify(updateRank));
    } else {
      const ranking = JSON.parse(storedRank);
      const updateRank = [...ranking, {
        name,
        score,
        picture: gravatarEmail,
      }];
      localStorage.setItem('ranking', JSON.stringify(updateRank));
    }
  }

  redirectToLogin() {
    this.setState({ stateRedirect: true });
  }

  render() {
    const stateLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = stateLocalStorage;
    const { redirectToLogin, state: { stateRedirect } } = this;

    return (
      <>
        <Header score={ score } />
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ redirectToLogin }
        >
          Jogar novamente
        </button>
        { stateRedirect && <Redirect to="/" /> }
        <h2 data-testid="feedback-text">
          {
            (assertions < ASSERTION_AVERAGE ? 'Podia ser melhor...' : 'Mandou bem!')
          }
        </h2>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
      </>
    );
  }
}

export default Feedback;
