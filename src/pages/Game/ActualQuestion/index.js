import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AnswerButtonS from './styles';

// Action para adicionar pontos ao score;
import sumScore from '../../../Redux/reducers/player/actions/sumScore';

class ActualQuestion extends Component {
  constructor() {
    super();
    this.counter = this.counter.bind(this);
    this.submitCorrectAnswer = this.submitCorrectAnswer.bind(this);
    this.handleChangeStyle = this.handleChangeStyle.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.addToRanking = this.addToRanking.bind(this);

    this.state = {
      answered: false,
      timer: 30,
      redirect: false,
    };
  }

  // No momento que o componente é montado inicia o timer;
  componentDidMount() {
    this.counter();
  }

  componentDidUpdate() {
    const { timer, answered } = this.state;
    // Caso o usuário responda ou o timer chegue em zero o "setInterval()" será cancelado;
    if (timer === 0 || answered) {
      clearInterval(this.interval);
    }
  }

  counter() {
    const oneSecond = 1000; // Um segundo em milisegundos;
    const interval = 30000; // 30 segundos em milisegundos;

    // this.interval é o ID do intervalo retornado pelo "setInterval()";
    this.interval = setInterval(() => this.setState(({ timer }) => ({
      timer: timer - 1,
    })), oneSecond);

    // Após 30 segundos mudará o estado representando que foi respondido;
    this.timeOut = setTimeout(() => this.setState({ answered: true }), interval);
  }

  handleChangeStyle() {
    this.setState({ answered: true });
  }

  // Método executado quando o usuário acerta a questão;
  submitCorrectAnswer() {
    const { timer } = this.state;
    const { question: { difficulty }, pointsToScore } = this.props;

    const mediumLoad = 2; // Peso de uma questão de dificuldade "média";
    const hardLoad = 3; // Peso de uma questão de dificuldade "difícil";
    let difficultyLoad = 1; // Peso de uma questão de dificuldade "fácil";
    if (difficulty === 'medium') difficultyLoad = mediumLoad;
    if (difficulty === 'hard') difficultyLoad = hardLoad;

    const defaultValue = 10;
    // Soma de pontos de acordo com o README.md
    const points = defaultValue + (timer * difficultyLoad);
    pointsToScore(points);
  }

  // Método que "reseta" o componente;
  handleReset() {
    this.setState({
      answered: false,
      timer: 30,
    });
    clearTimeout(this.timeOut); // Remove o "setTimeout()";
    clearInterval(this.interval); // Remove o "setInterval()";
    this.counter(); // Inicia novamente o timer;
  }

  /* Quando está na quinta questão e clica no botão "Próxima"
  muda o estado e será redirecionado para a tela de feedbacks; */
  handleRedirect() {
    this.setState({ redirect: true });
  }

  addToRanking() {
    const { picture, name, score } = this.props;
    const saveRanking = JSON.parse(localStorage.getItem('ranking'));
    if (saveRanking) {
      localStorage.setItem('ranking', JSON.stringify(
        [...saveRanking, { picture, name, score }],
      ));
    } else {
      localStorage.setItem('ranking', JSON.stringify(
        [{ picture, name, score }],
      ));
    }
  }

  // Renderiza as respostas;
  renderAnswers(answers, correctAnswer, answered) {
    let count = 0;
    return answers.map((answer, index) => {
      if (answer === correctAnswer) {
        return (
          <AnswerButtonS
            key={ answer }
            type="button"
            data-testid="correct-answer"
            styles={ { correct: true, answered } }
            onClick={ () => { this.handleChangeStyle(); this.submitCorrectAnswer(); } }
            disabled={ answered }
          >
            { answer }
          </AnswerButtonS>
        );
      }

      count += index === 0 ? 0 : 1;
      return (
        <AnswerButtonS
          key={ answer }
          type="button"
          data-testid={ `wrong-answer-${count}` }
          styles={ { correct: false, answered } }
          onClick={ this.handleChangeStyle }
          disabled={ answered }
        >
          { answer }
        </AnswerButtonS>
      );
    });
  }

  render() {
    const {
      question: {
        category,
        question,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
      nextQuestion,
      questionIndex,
    } = this.props;
    const { answered, timer, redirect } = this.state;

    const answers = [...incorrectAnswers, correctAnswer];
    answers.sort();
    const maxLength = 4;

    return (
      <section>
        <p>{ timer }</p>
        <h2 data-testid="question-category">{ category }</h2>
        <p data-testid="question-text">{ question }</p>
        <div>
          { this.renderAnswers(answers, correctAnswer, answered) }
          { answered && (questionIndex < maxLength ? (
            <button
              type="button"
              onClick={ () => { nextQuestion(); this.handleReset(); } }
              data-testid="btn-next"
            >
              Próxima
            </button>
          ) : (
            <button
              type="button"
              onClick={ () => { this.handleRedirect(); this.addToRanking(); } }
              data-testid="btn-next"
            >
              Próxima
            </button>
          )) }
          { redirect && <Redirect to="/feedback" /> }
        </div>
      </section>
    );
  }
}

ActualQuestion.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  pointsToScore: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  questionIndex: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  pointsToScore: (points) => dispatch(sumScore(points)),
});

export default connect(null, mapDispatchToProps)(ActualQuestion);
