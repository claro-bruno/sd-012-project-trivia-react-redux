import React from 'react';

class FinalResults extends React.Component {
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
