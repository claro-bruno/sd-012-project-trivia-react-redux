import React from 'react';

class MessageFeedback extends React.Component {
  getAssertions() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state.player.assertions < 2 + 1) {
      return this.messageCouldBeBetter();
    }
    if (state.player.assertions >= 2 + 1) {
      return this.messageGoodJob();
    }
  }

  messageCouldBeBetter() {
    return (
      <main data-testid="feedback-text">
        <h3>Podia ser melhor...</h3>
      </main>
    );
  }

  messageGoodJob() {
    return (
      <main data-testid="feedback-text">
        <h3>Mandou bem!</h3>
      </main>
    );
  }

  // A mensagem deve ser "Podia ser melhor..." caso a pessoa acerte menos de 3 perguntas
  // A mensagem deve ser "Mandou bem!" caso a pessoa acerte 3 perguntas ou mais
  render() {
    return (
      <div>
        {this.getAssertions()}
      </div>
    );
  }
}

export default MessageFeedback;
