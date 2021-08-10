import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getQuestions } from '../services/api';
import ButtonNextQuestion from '../components/ButtonNextQuestion';
import Timer from '../components/Timer';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      disableButton: false,
      answered: false,
      timer: 30,
    };

    this.getQuestions1 = this.getQuestions1.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions1();
  }

  async getQuestions1() {
    const results = await getQuestions();

    this.setState({ questions: results });
    return results;
  }

  buttonEnable(bool) {
    this.setState({
      disableButton: bool,
    });
  }

  // handleInplementButton() {
  //   this.setState((previusState) => ({
  //     index: previusState.index + 1,
  //   }));
  //   this.buttonEnable(true);
  //   // implementar no borda o buttonEnable como false
  //   // após o requisito 6 e 7 - implementar o reset da borda aqui;
  // }

  renderQuestions() {
    const { questions, timer, answered } = this.state;
    const questionFilter = questions.filter((category) => questions
      .indexOf(category) === 0);

    return (
      questionFilter.map((quest, index) => (
        <div key={ index } className="questions">
          <Timer
            timer={ timer }
            answered={ answered }
          />
          <h3 data-testid="question-category">{quest.category}</h3>
          <p data-testid="question-text">{quest.question}</p>
          <button
            type="button"
            data-testid="correct-answer"
            className="correct-answer-btn"
            id="correct-btn"
            onClick={ () => this.setState({ answered: true }) }
          >
            {quest.correct_answer}
          </button>
          {quest.incorrect_answers.map((wrong, index1) => (
            <button
              data-testid={ `wrong-answer-${index1}` }
              key={ index1 }
              type="button"
              className="incorrect-answer-btn"
              onClick={ () => this.setState({ answered: true }) }
            >
              {wrong}
            </button>
          ))}
        </div>
      ))
    );
  }

  render() {
    const { /* index */ disableButton, answered } = this.state;
    // o index acima, implementar após a lógica das respostas corretas
    // para mudar de acordo com o numero da questão;

    return (
      <div>
        <Header />
        {this.renderQuestions()}
        <ButtonNextQuestion
          disableButton={ disableButton }
          answered={ answered }
          /*  buttonEnable={ this.buttonEnable } */
          // colocar o buttonEnable após o return da modificação das bordas tanto para resetar
          // a borda, quanto para habilitar o botao para pergunta seguinte.
        />
        <Link to="/feedback">
          <button data-testid="feedbackButton" type="button">Feedback</button>
        </Link>
      </div>
    );
  }
}

export default Game;
