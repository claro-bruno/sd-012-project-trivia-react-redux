import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import { answerCheck, classChanger, addStateToStorage } from '../helpers';
import { updateScore, timerRestartChange } from '../redux/action';
import Button from './Button';
import styles from './Question.module.css';

const INITIAL_STATE = {
  click: false,
  disableBtn: false,
  show: false,
};

class Answers extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.disableAnswer = this.disableAnswer.bind(this);
    this.enableAnswers = this.enableAnswers.bind(this);

    this.state = INITIAL_STATE;
  }

  updateScoreAndQuestions(isCorrect) {
    const { upScore, difficulty, timer, score, rightQuestions } = this.props;
    const defaultScore = 10;
    const hardScore = 3;
    const mediumScore = 2;
    const easyScore = 1;
    let questionScore = 0;
    if (difficulty === 'hard') questionScore = defaultScore + (timer * hardScore);
    if (difficulty === 'medium') questionScore = defaultScore + (timer * mediumScore);
    if (difficulty === 'easy') questionScore = defaultScore + (timer * easyScore);

    if (isCorrect === 'correct-answer') {
      upScore(questionScore);
      addStateToStorage('score', questionScore + score);
      addStateToStorage('assertions', 1 + rightQuestions);
    }
  }

  handleClick(isCorrect) {
    const { click } = this.state;
    if (!click) {
      this.disableAnswer();
      this.updateScoreAndQuestions(isCorrect);
    }
  }

  disableAnswer() {
    this.setState({
      disableBtn: true,
      click: true,
      show: true,
    });
  }

  enableAnswers() {
    this.setState(INITIAL_STATE);
  }

  render() {
    const { answers, correctAnswer, restartTimer, nextQuestion } = this.props;
    const { click, disableBtn, show } = this.state;
    return (
      <section className="btnSection">
        <Timer disableAnswer={ this.disableAnswer } clickAnswer={ click } />
        <div className={ styles.answersContainer }>
          { answers.map((answer, index) => (
            <button
              type="button"
              className={ classChanger(correctAnswer, answer, click) }
              key={ index }
              data-testid={ answerCheck(correctAnswer, answer, index) }
              onClick={
                () => this.handleClick(answerCheck(correctAnswer, answer, index))
              }
              disabled={ disableBtn }
            >
              { answer }
            </button>)) }
        </div>
        { show && <Button
          buttonText="Próxima"
          testId="btn-next"
          onClick={ async () => {
            await restartTimer();
            this.enableAnswers();
            nextQuestion();
          } }
        /> }
      </section>
    );
  }
}

Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  rightQuestions: PropTypes.number.isRequired,
  upScore: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  restartTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.game.score,
  rightQuestions: state.game.assertions,
  timer: state.game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  upScore: (score) => dispatch(updateScore(score)),
  restartTimer: () => dispatch(timerRestartChange()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
