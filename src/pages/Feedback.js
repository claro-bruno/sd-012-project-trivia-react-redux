import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';

const ASSERTION_AVERAGE = 3;

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleRanking = this.handleRanking.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.handleClickRanking = this.handleClickRanking.bind(this);

    this.state = {
      stateRedirect: false,
      redirectRanking: false,
    };
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleClickRanking() {
    this.setState((state) => ({
      ...state,
      redirectRanking: true,
    }));
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
    const {
      redirectToLogin,
      handleClickRanking,
      state: {
        stateRedirect,
        redirectRanking,
      },
    } = this;

    return (
      <>
        { redirectRanking && <Redirect to="/ranking" />}
        { stateRedirect && <Redirect to="/" /> }
        <Header score={ score } />
        <Button
          name="Jogar novamente"
          testId="btn-play-again"
          handleClick={ redirectToLogin }
        />
        <Button
          name="Ver Ranking"
          testId="btn-ranking"
          handleClick={ handleClickRanking }
        />
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
