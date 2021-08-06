import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Performance from '../components/Performance';


export default class Config extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRedirectLogin: false,
      shouldRedirectRanking: false,
    };

    this.redirectLogin = this.redirectLogin.bind(this);
    this.redirectRanking = this.redirectRanking.bind(this);
  }

  redirectLogin() {
    this.setState({ shouldRedirectLogin: true });
  }

  redirectRanking() {
    this.setState({ shouldRedirectRanking: true });
  }

  render() {
    const { shouldRedirectLogin, shouldRedirectRanking } = this.state;
    if (shouldRedirectLogin) return <Redirect to="/" />;
    if (shouldRedirectRanking) return <Redirect to="/ranking" />;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback Bonito</h1>
        <Performance />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectLogin }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}
