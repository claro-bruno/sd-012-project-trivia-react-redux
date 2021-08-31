import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';
import TrueOrFalse from './TrueOrFalse';
import MultipleChoice from './MultipleChoice';
import Time from './Time';
import { nextQuestion, resetTimer, updateScore } from '../actions';

const baseScore = 10;

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      disableButtons: false,
      nexButtonVisible: false,
    };

    this.toggleDisableButtons = this.toggleDisableButtons.bind(this);
    this.setScore = this.setScore.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.toggleNextButtonVisibility = this.toggleNextButtonVisibility.bind(this);
  }

  setScore() {
    const { question, timer, dispatchUpdateScore } = this.props;

    const difficultyScore = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const stateObj = JSON.parse(localStorage.getItem('state'));

    stateObj.player.score += baseScore + (timer * difficultyScore[question.difficulty]);
    stateObj.player.assertions += 1;

    localStorage.setItem('state', JSON.stringify(stateObj));

    dispatchUpdateScore(stateObj.player.score);
  }

  toggleDisableButtons() {
    this.setState((previousState) => ({
      disableButtons: !previousState.disableButtons,
    }));
  }

  resetColor() {
    const buttons = document.querySelectorAll('button[data-testid*="answer"]');
    for (let index = 0; index < buttons.length; index += 1) {
      buttons[index].classList.remove(...buttons[index].classList);
    }
  }

  handleNextQuestion() {
    const { dispatchNextQuestion, dispatchResetTimer,
      questions, question, history, gravatar } = this.props;

    if (questions.indexOf(question) === questions.length - 1) {
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
      const { player } = JSON.parse(localStorage.getItem('state'));

      ranking.push({
        name: player.name,
        score: player.score,
        picture: gravatar,
      });

      ranking.sort((first, second) => second.score - first.score);

      localStorage.setItem('ranking', JSON.stringify(ranking));

      history.push('/feedback');
    } else {
      dispatchNextQuestion();
      dispatchResetTimer();

      this.resetColor();
      this.toggleNextButtonVisibility();
    }
  }

  changeColor({ target }) {
    const getButtons = target.parentElement.children;

    for (let index = 0; index < getButtons.length; index += 1) {
      if (getButtons[index].dataset.testid === 'correct-answer') {
        getButtons[index].classList.add('correct');
      } else {
        getButtons[index].classList.add('wrong');
      }
    }
  }

  toggleNextButtonVisibility() {
    this.setState((previousState) => ({
      nexButtonVisible: !previousState.nexButtonVisible,
    }));
  }

  renderAnswers() {
    const { question } = this.props;
    const { disableButtons } = this.state;

    return (
      <section>
        {
          question.type === 'boolean'
            ? (
              <TrueOrFalse
                changeColor={ this.changeColor }
                toggleNextButtonVisibility={ this.toggleNextButtonVisibility }
                setScore={ this.setScore }
                disabled={ disableButtons }
              />
            )
            : (
              <MultipleChoice
                changeColor={ this.changeColor }
                toggleNextButtonVisibility={ this.toggleNextButtonVisibility }
                setScore={ this.setScore }
                disabled={ disableButtons }
              />
            )
        }
      </section>
    );
  }

  render() {
    const { question, isLoading, error } = this.props;
    const { nexButtonVisible } = this.state;

    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    return (
      <section>
        <section>
          <p
            data-testid="question-category"
          >
            { question.category }
          </p>
          <p
            data-testid="question-text"
          >
            { question.question }
          </p>
        </section>
        { this.renderAnswers() }
        <Time toggleDisableButtons={ this.toggleDisableButtons } />
        <button
          type="button"
          onClick={ this.handleNextQuestion }
          hidden={ !nexButtonVisible }
          data-testid="btn-next"
        >
          Próxima
        </button>
      </section>
    );
  }
}

const mapStateToProps = (
  { gameReducer: { questions, question, timer, isLoading, error },
    playerReducer: { gravatar },
  },
) => ({
  questions,
  question,
  timer,
  isLoading,
  error,
  gravatar,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNextQuestion: () => dispatch(nextQuestion()),
  dispatchResetTimer: () => dispatch(resetTimer()),
  dispatchUpdateScore: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answer: PropTypes.arrayOf(PropTypes.string),
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}.isRequired;
