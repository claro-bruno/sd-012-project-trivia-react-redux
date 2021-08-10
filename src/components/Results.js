import React from 'react';

class Results extends React.Component {
  render() {
    const results = JSON.parse(localStorage.getItem('state'));
    const { player } = results;
    return (
      <div>
        <p>
          { 'Você acertou ' }
          <span data-testid="feedback-total-question">
            { player.assertions }
          </span>
          { ' perguntas' }
        </p>
        <p>
          { 'Sua pontuação foi de ' }
          <span data-testid="feedback-total-score">
            { player.score }
          </span>
        </p>
      </div>
    );
  }
}

export default Results;
