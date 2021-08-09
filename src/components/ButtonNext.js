import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextQuestion } from '../redux/actions';

class ButtonNext extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleClick() {
    const { getQuestion,
      setTimer,
      timerIntervalID,
      nextQuestions,
      questions,
      questionNumber,
    } = this.props;
    clearInterval(timerIntervalID);
    if (questionNumber < questions.length) {
      nextQuestions();
      getQuestion();
      setTimer();
    }
  }

  renderButton() {
    const { questionNumber, questions } = this.props;
    if (questionNumber >= questions.length) {
      return (
        <Link to="/feedback">
          <button
            onClick={ this.handleClick }
            data-testid="btn-next"
            type="button"
          >
            Próxima
          </button>
        </Link>
      );
    }
    return (
      <button
        onClick={ this.handleClick }
        data-testid="btn-next"
        type="button"
      >
        Próxima
      </button>
    );
  }

  render() {
    return (
      <div>
        { this.renderButton() }
      </div>
    );
  }
}

ButtonNext.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  timerIntervalID: PropTypes.number.isRequired,
  nextQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionNumber: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  questionNumber: state.game.questionNumber,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestions: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNext);
