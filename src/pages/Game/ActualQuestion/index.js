import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AnswerButtonS from './styles';

// Action para adicionar pontos ao score;
import sumScore from '../../../Redux/reducers/player/actions/sumScore';

class ActualQuestion extends Component {
  constructor() {
    super();
    this.counter = this.counter.bind(this);
    this.submitCorrectAnswer = this.submitCorrectAnswer.bind(this);
    this.handleChangeStyle = this.handleChangeStyle.bind(this);

    this.state = {
      answered: false,
      timer: 30,
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
    setTimeout(() => this.setState({ answered: true }), interval);
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

  booleanQuestions(answers, correctAnswer, answered) {
    return answers.map((answer) => (
      (answer === correctAnswer)
        ? (
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
        ) : (
          <AnswerButtonS
            key={ answer }
            type="button"
            data-testid="wrong-answer-0"
            styles={ { correct: false, answered } }
            onClick={ this.handleChangeStyle }
            disabled={ answered }
          >
            { answer }
          </AnswerButtonS>
        )
    ));
  }

  multipleQuestions(answers, correctAnswer, answered) {
    let index = 0;
    return answers.map((answer) => {
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

      index += index !== 0 ? 1 : 0;
      return (
        <AnswerButtonS
          key={ answer }
          type="button"
          data-testid={ `wrong-answer-${index}` }
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
    const { question: {
      category,
      question,
      type,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } } = this.props;

    const { answered, timer } = this.state;

    const answers = [...incorrectAnswers, correctAnswer];
    answers.sort();

    return (
      <section>
        <p>{ timer }</p>
        <h2 data-testid="question-category">{ category }</h2>
        <p data-testid="question-text">{ question }</p>
        <div>
          { type === 'boolean'
            ? this.booleanQuestions(answers, correctAnswer, answered)
            : this.multipleQuestions(answers, correctAnswer, answered) }
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
};

const mapDispatchToProps = (dispatch) => ({
  pointsToScore: (points) => dispatch(sumScore(points)),
});

export default connect(null, mapDispatchToProps)(ActualQuestion);
