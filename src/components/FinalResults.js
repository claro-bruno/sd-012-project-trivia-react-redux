import React from 'react';
import { connect } from 'react-redux';

class FinalResults extends React.Component {
  render() {
    return (
      <section>
        <div>
          <p>Pontos:</p>
          <p data-testid="feedback-total-score">{ 55 }</p>
        </div>
        <div>
          <p>Acertos:</p>
          <p data-testid="feedback-total-question">{ 5 }</p>
        </div>
      </section>
    );
  }
}

export default connect()(FinalResults);
