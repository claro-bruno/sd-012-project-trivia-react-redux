import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../services/fetchToken';
import { actionDisabled, actionToken } from '../redux/actions';
import '../App.css';
import ButtonNext from './ButtonNext';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      btnClicked: false,
      nextQuestion: false, // muda pra true na funçao de mudar a cor;
    };

    // this.createQuestions = this.createQuestions.bind(this);
    this.createQuestionsV2 = this.createQuestions.bind(this);
    this.selectedResponse = this.selectedResponse.bind(this);
  }

  selectedResponse() {
    this.setState({
      btnClicked: true,
      nextQuestion: true,
    });
  }

  validateToken() {
    const { getToken } = this.props;
    localStorage.clear();
    fetchToken();
    getToken(localStorage.getItem('token'));
    // this.createQuestions();
  }

  // Lógica feita com auxílio do meu colega Matheus Figueiredo,
  // onde nos ajudou nos fornecendo a lógica do sort
  createQuestions() {
    const { questions } = this.props;
    const { index } = this.state;
    const CORRECT_ANSWER = 'correct-answer';
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[index];
    return [
      {
        answer: correctAnswer,
        id: CORRECT_ANSWER,
        ifCorrect: CORRECT_ANSWER,
      },
      ...incorrectAnswers.map((item, i) => ({
        answer: item,
        id: `wrong-answer-${i}`,
        ifCorrect: 'wrong-answer',
      })),
    ].sort((a, b) => a.answer.localeCompare(b.answer));
  }

  render() {
    const { index, btnClicked, nextQuestion } = this.state;
    const { questions, isDisabled } = this.props;
    const CORRECT_ANSWER = 'correct-answer';
    return (
      <>
        <div>
          <p data-testid="question-category">{questions[index].category}</p>
          <p data-testid="question-text">{questions[index].question}</p>
        </div>
        <div>
          {
            this.createQuestions().map((question) => (
              <button
                data-testid={ question.id === CORRECT_ANSWER
                  ? CORRECT_ANSWER
                  : question.id }
                type="button"
                key={ `${question.id}` }
                disabled={ isDisabled }
                className={ btnClicked
                  ? question.ifCorrect
                  : '' }
                onClick={ this.selectedResponse }
              >
                {question.answer}
              </button>
            ))
          }
        </div>
        { nextQuestion && <ButtonNext testId="btn-next" /> }

      </>
    );
  }
}

Questions.propTypes = {
  getToken: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    length: PropTypes.string,
    correctanswer: PropTypes.arrayOf(PropTypes.string),
    incorrectanswer: PropTypes.arrayOf(PropTypes.string),
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isDisabled: state.disabledReducer.isDisabled,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: (token) => dispatch(actionToken(token)),
  setDisabled: (isDisabled) => dispatch(actionDisabled(isDisabled)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
