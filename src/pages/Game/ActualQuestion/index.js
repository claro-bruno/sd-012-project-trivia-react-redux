import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnswerButtonS from './styles';

class ActualQuestion extends Component {
  constructor() {
    super();
    this.handleChangeStyle = this.handleChangeStyle.bind(this);
    this.counter = this.counter.bind(this);

    this.state = {
      answered: false,
      timer: 30,
    };
  }

  // No momento que o componente é montado inicia o timer;
  componentDidMount() {
    this.counter();
  }

  // Conforme a atualização do componente, caso o timer chegue a zero é removido;
  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.interval);
    }
  }

  counter() {
    const oneSecond = 1000; // Tempo de um segundo em milisegundos;
    const interval = 30000; // 30 segundos em milisegundos;

    // Após 30 segundos mudará o estado representando que foi respondido;
    setTimeout(() => this.setState({ answered: true }), interval);
    // this.interval é o ID do intervalo retornado pelo "setInterval()";
    this.interval = setInterval(() => this.setState(({ timer }) => ({
      timer: timer - 1,
    })), oneSecond);
  }

  handleChangeStyle() {
    this.setState({ answered: true });
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
            onClick={ this.handleChangeStyle }
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
            onClick={ this.handleChangeStyle }
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
};

export default ActualQuestion;
