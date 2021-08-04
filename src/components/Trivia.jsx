import React from 'react';
import PropTypes from 'prop-types';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.changeStyles = this.changeStyles.bind(this);
  }

  // Algoritmo de embaralhamento de Fisher–Yates, retirado de https://pt.stackoverflow.com/questions/406037/mostrar-elementos-de-um-array-em-ordem-aleat%C3%B3ria
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  changeStyles() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(({ value, style }) => {
      if (value === 'wrong') {
        style.border = '3px solid rgb(255, 0, 0)';
      } else {
        style.border = '3px solid rgb(6, 240, 15)';
      }
    });
  }

  createButtons(wrongList, answer) {
    const buttonList = wrongList.map((wrong, index) => (
      <button
        key={ index }
        data-testid={ `wrong-answer-${index}` }
        type="button"
        value="wrong"
        onClick={ this.changeStyles }
      >
        {wrong}
      </button>));

    const asnwerButton = (
      <button
        key={ buttonList.length }
        data-testid="correct-answer"
        type="button"
        value="correct"
        onClick={ this.changeStyles }
      >
        {answer}
      </button>
    );
    buttonList.push(asnwerButton);
    return buttonList;
  }

  renderButtons() {
    const { trivia } = this.props;
    const { correct_answer: answer, incorrect_answers: wrong } = trivia;
    const questions = this.createButtons(wrong, answer);
    const randomQuestions = this.shuffle(questions);
    return randomQuestions;
  }

  render() {
    const { trivia } = this.props;
    const { category, question } = trivia;
    return (
      <div>
        <h4 data-testid="question-category">{category}</h4>
        <h3 data-testid="question-text">{`Pergunta: ${question}`}</h3>
        { this.renderButtons() }
      </div>
    );
  }
}

Trivia.propTypes = {
  trivia: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Trivia;
