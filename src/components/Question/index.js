import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { updateScore, updateQuestion } from '../../redux/actions';
import Cronometer from '../Cronometer';
import NextButton from '../NextButton';
import './style.css';

const correctText = 'correct-answer';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      random: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.setRandom = this.setRandom.bind(this);
  }

  componentDidMount() {
    this.setRandom();
  }

  setRandom() {
    const { qnObj: { incorrect_answers: incorrectAnswers } } = this.props;
    const { random } = this.state;
    const ARRAY_LENGTH = incorrectAnswers.length + 1;
    if (!random) this.setState({ random: Math.floor(Math.random() * ARRAY_LENGTH) });
  }

  shuffleAnswers() {
    const {
      qnObj: { correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers } } = this.props;
    const { random } = this.state;
    const arrayAnswers = incorrectAnswers
      .map((answer, index) => (
        this.createAnswer([atob(answer), `wrong-answer-${index}`, 'wrong-answer'])));
    const correct = this.createAnswer(
      [atob(correctAnswer), correctText, correctText],
    );
    arrayAnswers.splice(random, 0, correct);
    return arrayAnswers;
  }

  createAnswer([answer, testid, className]) {
    const { question: { answered } } = this.props;
    return (
      <button
        key={ uuidv4() }
        type="button"
        data-testid={ testid }
        id={ testid }
        className={ answered ? `${className} answer` : 'answer' }
        disabled={ answered }
        onClick={ this.handleClick }
      >
        { answer }
      </button>
    );
  }

  handleClick({ target: { id } }) {
    const { updateQuestion: update,
      question: { qnNum }, updateScore: addPoints } = this.props;
    const payload = { question: { qnNum, answered: true } };
    update(payload);
    if (id === correctText) {
      const state = JSON.parse(localStorage.getItem('state'));
      const { player: { score, assertions } } = state;
      const { answerTime } = this.props;
      const newScore = score + this.pointsCalculator(answerTime);
      const newAssertions = assertions + 1;
      addPoints({ score: newScore, assertions: newAssertions });
      const newState = {
        player: { ...state.player, score: newScore, assertions: newAssertions } };
      localStorage.setItem('state', JSON.stringify(newState));
    }
  }

  pointsCalculator(answerTime) {
    const { qnObj: { difficulty } } = this.props;
    const diffConvertion = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const TEN = 10;
    const score = TEN + (answerTime * diffConvertion[atob(difficulty)]);
    return score;
  }

  /** Source: https://forums.pixeltailgames.com/t/encoding-issues-in-questions-answers/34751/2 */
  render() {
    const { qnObj: { category, question: text },
      question: { answered, qnNum } } = this.props;
    return (
      <section className="question-container">
        <Cronometer callback={ this.pointsCalculator } />
        <h4 data-testid="question-category">{ atob(category) }</h4>
        <p data-testid="question-text">{ atob(text) }</p>
        <section className="answers-container">
          { this.shuffleAnswers() }
        </section>
        { answered && <NextButton qnNum={ qnNum } /> }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.trivia });

const mapDispatchToProps = { updateScore, updateQuestion };

Question.propTypes = {
  qnObj: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired)
      .isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
  question: PropTypes.shape({
    qnNum: PropTypes.number.isRequired,
    answered: PropTypes.bool.isRequired,
  }).isRequired,
  answerTime: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
