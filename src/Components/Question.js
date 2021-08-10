import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffle, difficultyToPoints } from '../data/helpers';
import { updateScore } from '../redux/actions';
import Stopwatch from './Stopwatch';
import NextButton from './NextButton';
import '../App.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.state = {
      correta: '',
      errada: '',
      answers: shuffle([
        { correctAnswer: props.question.correct_answer },
        ...props.question.incorrect_answers]),
    };
    this.revealAnswers = this.revealAnswers.bind(this);
  }

  componentDidMount() {
    const { dispatchUpdateScore } = this.props;
    dispatchUpdateScore();
  }

  revealAnswers() {
    this.setState({
      correta: 'correta',
      errada: 'errada',
    });
  }

  handleAnswer(isCorrect) {
    const {
      question,
      dispatchUpdateScore,
      stopTimer,
      remainingTime,
    } = this.props;
    this.revealAnswers();
    stopTimer();
    dispatchUpdateScore(
      remainingTime, difficultyToPoints(question.difficulty), isCorrect,
    );
  }

  render() {
    const { answers, correta, errada } = this.state;
    const {
      question,
      isOutOfTime,
      isQuestionAnswered,
      history,
    } = this.props;

    return (
      <>
        <Stopwatch />
        <h2 data-testid="question-category">{`Categoria: ${question.category}`}</h2>
        <h3 data-testid="question-text">{`Pergunta: ${question.question}`}</h3>
        {answers.map((answer, index) => (
          (answer.correctAnswer)
            ? (
              <button
                className={ correta }
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
                className={ errada }
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
        <NextButton history={ history } />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  remainingTime: state.timer.remainingTime,
  stopTimer: state.timer.stopTimerCallback,
  isOutOfTime: state.timer.isOutOfTime,
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
  remainingTime: PropTypes.number.isRequired,
};
