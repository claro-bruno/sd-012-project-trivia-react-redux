import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnswerButtonS from './styles';

class ActualQuestion extends Component {
  constructor() {
    super();
    this.handleChangeStyle = this.handleChangeStyle.bind(this);

    this.state = {
      answered: false,
    };
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

    const { answered } = this.state;

    const answers = [...incorrectAnswers, correctAnswer];
    answers.sort();

    return (
      <section>
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
