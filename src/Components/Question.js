import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shuffle from '../data/helpers';
import { nextQuestion } from '../redux/actions';
import Stopwatch from './Stopwatch';

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.state = {
      answers: shuffle([
        { correctAnswer: props.question.correct_answer },
        ...props.question.incorrect_answers]),
    };
  }

  handleAnswer(isCorrect) {
    const {
      dispatchNextQuestion,
      stopTimer,
    } = this.props;
    stopTimer();
    dispatchNextQuestion();
    console.log(isCorrect);
  }

  render() {
    const { question, isOutOfTime } = this.props;
    const { answers } = this.state;
    return (
      <>
        <Stopwatch />
        <h2 data-testid="question-category">{`Categoria: ${question.category}`}</h2>
        <h3 data-testid="question-text">{`Pergunta: ${question.question}`}</h3>
        {answers.map((answer, index) => (
          (answer.correctAnswer)
            ? (
              <button
                data-testid="correct-answer"
                type="button"
                key={ answer.correctAnswer }
                onClick={ () => this.handleAnswer(true) }
                disabled={ isOutOfTime }
              >
                {answer.correctAnswer}
              </button>
            )
            : (
              <button
                data-testid={ `wrong-answer-${index}` }
                type="button"
                key={ answer }
                onClick={ () => this.handleAnswer(false) }
                disabled={ isOutOfTime }
              >
                {answer}
              </button>
            )
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  stopTimer: state.timer.stopTimerCallback,
  isOutOfTime: state.timer.isOutOfTime,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchNextQuestion: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  question: PropTypes.shape().isRequired,
  dispatchNextQuestion: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  isOutOfTime: PropTypes.bool.isRequired,
};
