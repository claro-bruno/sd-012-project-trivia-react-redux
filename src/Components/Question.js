import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffle, difficultyToPoints } from '../data/helpers';
import { updateScore } from '../redux/actions';
import Stopwatch from './Stopwatch';
import NextButton from './NextButton';

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

  componentDidMount() {
    const { dispatchUpdateScore } = this.props;
    dispatchUpdateScore();
  }

  handleAnswer(isCorrect) {
    const {
      question,
      dispatchUpdateScore,
      stopTimer,
      remainingTime,
    } = this.props;
    stopTimer();
    dispatchUpdateScore(
      remainingTime, difficultyToPoints(question.difficulty), isCorrect,
    );
  }

  render() {
    const {
      question,
      isOutOfTime,
      isQuestionAnswered,
      isAnswering,
      history,
    } = this.props;
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
                disabled={ isOutOfTime || isQuestionAnswered }
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
                disabled={ isOutOfTime || isQuestionAnswered }
              >
                {answer}
              </button>
            )
        ))}
        { !isAnswering && <NextButton history={ history } /> }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  remainingTime: state.timer.remainingTime,
  stopTimer: state.timer.stopTimerCallback,
  isOutOfTime: state.timer.isOutOfTime,
  isAnswering: state.timer.isAnswering,
  isQuestionAnswered: state.timer.isQuestionAnswered,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateScore: (timer, difficulty, isCorrect) => dispatch(
    updateScore(timer, difficulty, isCorrect),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  question: PropTypes.shape().isRequired,
  dispatchUpdateScore: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  isOutOfTime: PropTypes.bool.isRequired,
  isQuestionAnswered: PropTypes.bool.isRequired,
  isAnswering: PropTypes.bool.isRequired,
  remainingTime: PropTypes.number.isRequired,
};
