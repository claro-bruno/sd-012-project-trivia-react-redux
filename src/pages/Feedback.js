import React from 'react';
import Header from '../components/Header';

const ASSERTION_AVERAGE = 3;

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleUser = this.handleUser.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleUser() {
    const userInfo = localStorage.getItem('player');
    const playerInfo = JSON.parse(userInfo);

    const { name, assertions, score, gravatarEmail } = playerInfo;

    return (name, assertions, score, gravatarEmail);
  }

  handleRanking() {
    const storedRank = localStorage.getItem('ranking');
    if (!storedRank) {
      const { name, score, gravatarEmail } = this.handleUser();
      const updateRank = [{
        name,
        score,
        picture: gravatarEmail,
      }];
      localStorage.setItem('ranking', JSON.stringify(updateRank));
    }
    const ranking = JSON.parse(storedRank);
    const { name, score, gravatarEmail } = this.handleUser();
    const updateRank = [...ranking, {
      name,
      score,
      picture: gravatarEmail,
    }];

    localStorage.setItem('ranking', JSON.stringify(updateRank));
  }

  render() {
    const {
      handleUser: {
        assertions,
        score,
      },
    } = this;
    return (
      <>
        <Header />
        <h2 data-testid="feedback-text">
          {
            (assertions < ASSERTION_AVERAGE ? 'Podia ser melhor...' : 'Mandou bem!')
          }
        </h2>
        <p data-testid="feedback-total-score">
          Sua pontuação final foi:
          { score }
        </p>
        <p data-testid="feedback-total-question">
          Você acertou
          { assertions }
          questões
        </p>
      </>
    );
  }
}

export default Feedback;
