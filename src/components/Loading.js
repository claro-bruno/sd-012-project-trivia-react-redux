import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div>
        <p>Carregando Perguntas</p>
        <p data-testid="question-category"> </p>
        <p data-testid="question-text"> </p>
        <p data-testid="correct-answer"> </p>
        <p data-testid="correct-wrong-answer 0"> </p>
      </div>
    );
  }
}

export default Loading;
