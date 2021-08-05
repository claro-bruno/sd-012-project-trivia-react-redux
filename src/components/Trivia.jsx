import React from 'react';
import PropTypes from 'prop-types';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: [],
      time: 30,
    };

    this.changeStyles = this.changeStyles.bind(this);
    this.button = this.button.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const proxButton = document.getElementById('proxButton');
    proxButton.style.visibility = 'hidden';
    this.mountButtons();
    this.timer();
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(this.myInterval);
    }
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

    buttons.forEach((button) => {
      if (button.value === 'wrong') {
        button.style.border = '3px solid rgb(255, 0, 0)';
        button.disabled = true;
      } if (button.value === 'correct') {
        button.style.border = '3px solid rgb(6, 240, 15)';
        button.disabled = true;
      }
    });
    const proxButton = document.getElementById('proxButton');
    proxButton.style.visibility = 'visible';

    clearInterval(this.myInterval);
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

  button() {
    const { onClick } = this.props;
    return (
      <button
        data-testid="btn-next"
        type="button"
        id="proxButton"
        onClick={ onClick }
      >
        Próxima
      </button>
    );
  }

  timer() {
    const timeout = 1000;
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, timeout);
  }

  mountButtons() {
    this.setState({
      buttons: this.renderButtons(),
    });
  }

  verficaString(str) {
    let verication = str.replaceAll('&quot;', '"');
    verication = verication.replaceAll('&#34;', '"');
    verication = verication.replaceAll('&Aring;', 'Å');
    verication = verication.replaceAll('&#039;', '\'');
    verication = verication.replaceAll('&pi;', '3,14');
    return (`Pergunta: ${verication}`);
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
    const { buttons, time } = this.state;
    return (
      <div>
        <div>{time}</div>
        <h4 data-testid="question-category">{category}</h4>
        <h3 data-testid="question-text">{this.verficaString(question)}</h3>
        { buttons }
        { this.button() }
        { (time === 0) ? this.changeStyles() : null }
      </div>
    );
  }
}

Trivia.propTypes = {
  onClick: PropTypes.func.isRequired,
  trivia: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Trivia;
