import React from 'react';
import Header from '../components/Header';
import getUserInfo from '../services/api';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questionNumber: 0,
      actualQuestion: [],
      timer: 30,
      idTimer: 0,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.multiple = this.multiple.bind(this);
    // this.boolean = this.boolean.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleWriteError = this.handleWriteError.bind(this);
    this.timeInterval = this.timeInterval.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleWriteError(text) {
    text = text.replaceAll('&#039;', '\'');
    text = text.replaceAll('&quot;', '"');
    text = text.replaceAll('&rdquo;', '"');
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
      timer: 30,
    }, () => this.timeInterval());
  }

  checkAnswer(e) {
    const { questionNumber, questions, idTimer } = this.state;
    clearInterval(idTimer);
    if (e) console.log(e.target);
    // Essa linha só ta dando um console se a resposta é certa ou não.
    // É aqui que deve implementar o que fazer caso a resposta esteja certa ou não.
    const answers = document.querySelectorAll('.alternative-btn');
    answers.forEach((answer) => {
      if (answer.value === questions[questionNumber].correct_answer) {
        answer.style.border = '3px solid rgb(6, 240, 15)';
        answer.disabled = true;
      } else {
        answer.style.border = '3px solid rgb(255, 0, 0)';
        answer.disabled = true;
      }
    });
  }

  /* https://flaviocopes.com/how-to-shuffle-array-javascript/
  Shuffle array, peguei desse link */

  multiple(question) {
    const { actualQuestion } = this.state;
    const range = 0.5;
    let buttonID = '';
    let wrongNumber = 0;
    const possibleAnswers = actualQuestion.length
      ? actualQuestion
      : [...question.incorrect_answers, question.correct_answer]
        .sort(() => Math.random() - range);
    if (!actualQuestion.length) {
      this.setState({ actualQuestion: [...possibleAnswers] });
    }
    const allButtons = possibleAnswers.map((item, index) => {
      if (item === question.correct_answer) {
        buttonID = 'correct-answer';
      } else {
        buttonID = `wrong-answer-${wrongNumber}`;
      }
      const alternativa = this.handleWriteError(item);
      const answer = (
        <button
          className="alternative-btn"
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

  // boolean() {
  //   return (
  //     <>
  //       <button
  //         onClick={ this.checkAnswer }
  //         type="button"
  //         value="True"
  //       >
  //         Verdadeiro
  //       </button>
  //       <button onClick={ this.checkAnswer } type="button" value="False">Falso</button>
  //     </>
  //   );
  // }

  timeInterval() {
    const { timer } = this.state;
    let time = timer;
    const delay = 1000;
    const timerGame = setInterval(() => {
      if (!(time - 1)) {
        time -= 1;
        clearInterval(timerGame);
        this.checkAnswer();
        return this.setState({ timer: time });
      }
      time -= 1;
      this.setState({ timer: time });
    }, delay);
    this.setState({ idTimer: timerGame });
  }

  render() {
    const { questionNumber, questions, timer } = this.state;
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
          <div>{ timer }</div>
          <h2 data-testid="question-category">{ actualQuestion.category }</h2>
          <h3 data-testid="question-text">{ pergunta }</h3>
          { this.multiple(actualQuestion) }
        </div>
      </div>
    );
  }
}

export default Game;
