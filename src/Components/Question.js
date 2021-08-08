import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shuffle from '../data/helpers';
import { nextQuestion } from '../redux/actions';

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    this.handleIncorrectAnswer = this.handleIncorrectAnswer.bind(this);
  }

  handleCorrectAnswer() {
    const { dispatchNextQuestion } = this.props;
    dispatchNextQuestion();
  }

  handleIncorrectAnswer() {
    const { dispatchNextQuestion } = this.props;
    dispatchNextQuestion();
  }

  render() {
    const { question } = this.props;
    const answers = shuffle([
      { correctAnswer: question.correct_answer },
      ...question.incorrect_answers,
    ]);
    return (
      <>
        <h2 data-testid="question-category">{`Categoria: ${question.category}`}</h2>
        <h3 data-testid="question-text">{`Pergunta: ${question.question}`}</h3>
        {answers.map((answer, index) => (
          (answer.correctAnswer)
            ? (
              <button
                data-testid="correct-answer"
                type="button"
                key={ answer.correctAnswer }
                onClick={ this.handleCorrectAnswer }
              >
                {answer.correctAnswer}
              </button>
            )
            : (
              <button
                data-testid={ `wrong-answer-${index}` }
                type="button"
                key={ answer }
                onClick={ this.handleIncorrectAnswer }
              >
                {answer}
              </button>
            )
        ))}
      </>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape().isRequired,
  dispatchNextQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  state,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchNextQuestion: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
