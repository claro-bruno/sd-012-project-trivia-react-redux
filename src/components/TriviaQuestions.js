import React, { Component } from 'react';

class TriviaQuestions extends Component {
  render() {
    const category = 'multiple';

    return (
      <div>
        <h1 data-testId="question-category">Categoria</h1>
        <h2 data-testId="question-text">Questão:</h2>
        {
          category === 'multiple' ? (
            <div>
              <button
                type="button"
                data-testid="{`wrong-answer-{index}`}"
              >
                Questão 1
              </button>
              <button
                type="button"
                data-testid="{`wrong-answer-{index}`}"
              >
                Questão 2
              </button>
              <button
                type="button"
                data-testid="{`wrong-answer-{index}`}"
              >
                Questão 3
              </button>
              <button
                type="button"
                data-testid="correct-answer"
              >
                Questão 4
              </button>
            </div>
          ) : (
            <div>
              <button type="button" data-testid="{`wrong-answer-{index}`}">
                verdadeiro
              </button>
              <button type="button" data-testid="correct-answer">
                falso
              </button>
            </div>
          )
        }
      </div>);
  }
}
export default TriviaQuestions;
