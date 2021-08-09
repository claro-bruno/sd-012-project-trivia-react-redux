import React from 'react';
import PropTypes from 'prop-types';

class FeedbackMsg extends React.Component {
  render() {
    const { msg, score, assertions } = this.props;
    return (
      <div>
        <p data-testid="feedback-text">{msg}</p>
        <p data-testid="feedback-total-question">{`Você acertou: ${assertions} questões!`}</p>
        <p data-testid="feedback-total-score">{`Seu score foi de: ${score} pontos!`}</p>
      </div>
    );
  }
}

FeedbackMsg.propTypes = {
  msg: PropTypes.string,
}.isRequired;

export default FeedbackMsg;
