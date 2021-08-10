import React from 'react';
import Header from '../components/Header';

const ASSERTION_AVERAGE = 3;

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleRanking = this.handleRanking.bind(this);
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

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = state;

    return (
      <>
        <Header score={ score } />
        <h2 data-testid="feedback-text">
          {
            (assertions < ASSERTION_AVERAGE ? 'Podia ser melhor...' : 'Mandou bem!')
          }
        </h2>
        <p data-testid="feedback-total-score">
          { `Sua pontuação final foi: ${score}` }
        </p>
        <p data-testid="feedback-total-question">
          { `Você acertou ${assertions} questões` }
        </p>
      </>
    );
  }
}

export default Feedback;
