import React from 'react';

class FinalResults extends React.Component {
  componentDidMount() {
    this.setLocalRanking();
  }

  setLocalRanking() {
    const state = JSON.parse(localStorage.getItem('state'));
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    if (localRanking === null) {
      const ranking = [{ name: state.player.name, score: state.player.score, picture: 'https://www.gravatar.com/avatar/' }];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      const ranking = [...localRanking, { name: state.player.name, score: state.player.score, picture: 'https://www.gravatar.com/avatar/' }];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  getScore() {
    const state = JSON.parse(localStorage.getItem('state'));
    return state.player.score;
  }

  getAssertions() {
    const state = JSON.parse(localStorage.getItem('state'));
    return state.player.assertions;
  }

  render() {
    return (
      <section>
        <div>
          <p>Pontos:</p>
          <p data-testid="feedback-total-score">{ this.getScore() }</p>
        </div>
        <div>
          <p>Acertos:</p>
          <p data-testid="feedback-total-question">{ this.getAssertions() }</p>
        </div>
      </section>
    );
  }
}

export default FinalResults;
