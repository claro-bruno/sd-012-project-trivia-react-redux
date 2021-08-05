import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../services/fetchToken';
import { actionToken } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };

    // this.createQuestions = this.createQuestions.bind(this);
    this.createQuestionsV2 = this.createQuestions.bind(this);
  }

  validateToken() {
    const { getToken } = this.props;
    localStorage.clear();
    fetchToken();
    getToken(localStorage.getItem('token'));
    // this.createQuestions();
  }

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
      },
      ...incorrectAnswers.map((item, i) => ({
        answer: item,
        id: `wrong-answer-${i}`,
      })),
    ].sort((a, b) => a.answer.localeCompare(b.answer));
  }

  render() {
    const { index } = this.state;
    const { questions } = this.props;
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
              >
                {question.answer}
              </button>
            ))
          }
        </div>
      </>
    );
  }
}

Questions.propTypes = {
  getToken: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    length: PropTypes.string,
    correctanswer: PropTypes.arrayOf(PropTypes.string),
    incorrectanswer: PropTypes.arrayOf(PropTypes.string),
    map: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: (token) => dispatch(actionToken(token)),
});

export default connect(null, mapDispatchToProps)(Questions);
