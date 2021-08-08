import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import { answerCheck, classChanger, addStateToStorage } from '../helpers';
import { updateScore, updateRightQuestions } from '../redux/action';
import NextButton from './NextButton';

class Answers extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.disableAnswer = this.disableAnswer.bind(this);
    this.state = {
      click: false,
      disableBtn: false,
      show: false,
    };
  }

  updateScoreAndQuestions(isCorrect) {
    const { upScore, right, difficulty, timer, score } = this.props;
    const defaultScore = 10;
    const hardScore = 3;
    const mediumScore = 2;
    const easyScore = 1;
    let questionScore = 0;
    if (difficulty === 'hard') questionScore = defaultScore + (timer * hardScore);
    if (difficulty === 'medium') questionScore = defaultScore + (timer * mediumScore);
    if (difficulty === 'easy') questionScore = defaultScore + (timer * easyScore);

    if (isCorrect === 'correct-answer') {
      right();
      upScore(questionScore);
      addStateToStorage('score', questionScore + score);
    }
  }

  handleClick(isCorrect) {
    const { click } = this.state;
    if (!click) {
      this.setState({
        click: true,
        show: true,
      });
      this.updateScoreAndQuestions(isCorrect);
    }
  }

  disableAnswer() {
    this.setState({
      disableBtn: true,
      click: true,
    });
  }

  render() {
    const { answers, correctAnswer } = this.props;
    const { click, disableBtn, show } = this.state;
    return (
      <section className="btnSection">
        <Timer disableAnswer={ this.disableAnswer } clickAnswer={ click } />
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
        { show && <NextButton /> }
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
  right: PropTypes.func.isRequired,
  upScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.game.score,
  rightQuestions: state.game.rightQuestions,
  timer: state.game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  upScore: (score) => dispatch(updateScore(score)),
  right: () => dispatch(updateRightQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
