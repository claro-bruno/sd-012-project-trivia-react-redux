import React from 'react';
import Header from '../components/Header';
import getUserInfo from '../services/api';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questionNumber: 0,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.multiple = this.multiple.bind(this);
    this.boolean = this.boolean.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleWriteError = this.handleWriteError.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleWriteError(text) {
    text = text.replaceAll('&#039;', '\'');
    text = text.replaceAll('&quot;', '"');
    return text;
  }

  async fetchApi() {
    let tokenTeste = localStorage.getItem('token');
    if (!tokenTeste) {
      const userInfo = await getUserInfo();
      localStorage.setItem('token', userInfo.token);
      tokenTeste = localStorage.getItem('token');
    }
    const apiRequest = `https://opentdb.com/api.php?amount=5&token=${tokenTeste}`;
    const res = await fetch(apiRequest);
    const data = await res.json();
    this.setState({
      questions: data.results,
    });
  }

  checkAnswer({ target }) {
    const { questionNumber, questions } = this.state;
    // Essa linha só ta dando um console se a resposta é certa ou não.
    // É aqui que deve implementar o que fazer caso a resposta esteja certa ou não.
    console.log(questions[questionNumber].correct_answer === target.value);
  }

  /* https://flaviocopes.com/how-to-shuffle-array-javascript/
  Shuffle array, peguei desse link */

  multiple(question) {
    const range = 0.5;
    let buttonID = '';
    let wrongNumber = 0;
    let possibleAnswers = [...question.incorrect_answers, question.correct_answer];
    possibleAnswers = possibleAnswers.sort(() => Math.random() - range);
    const allButtons = possibleAnswers.map((item, index) => {
      if (item === question.correct_answer) {
        buttonID = 'correct-answer';
      } else {
        buttonID = `wrong-answer-${wrongNumber}`;
      }
      const alternativa = this.handleWriteError(item);
      const answer = (
        <button
          data-testid={ buttonID }
          onClick={ this.checkAnswer }
          key={ index }
          type="button"
          value={ item }
        >
          { alternativa }
        </button>
      );
      if (buttonID === `wrong-answer-${wrongNumber}`) {
        wrongNumber += 1;
      }
      return answer;
    });
    return allButtons;
  }

  boolean() {
    return (
      <>
        <button
          onClick={ this.checkAnswer }
          type="button"
          value="True"
        >
          Verdadeiro
        </button>
        <button onClick={ this.checkAnswer } type="button" value="False">Falso</button>
      </>
    );
  }

  render() {
    const { questionNumber, questions } = this.state;
    if (!questions.length) {
      return (<h1>Loading</h1>);
    }
    const actualQuestion = questions[questionNumber];
    let pergunta = actualQuestion.question;
    pergunta = this.handleWriteError(pergunta);
    return (
      <div>
        <Header />
        <div>
          <h2 data-testid="question-category">{ actualQuestion.category }</h2>
          <h3 data-testid="question-text">{ pergunta }</h3>
          { actualQuestion.type === 'multiple' ? this
            .multiple(actualQuestion) : this.boolean() }
        </div>
      </div>
    );
  }
}

export default Game;
