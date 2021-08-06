import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { answerButtonClicked } from '../redux/actions';

class Answers extends Component {
  buttonClicked({ targer: name }) {
    if (name === 'correctAnswer') {
      const notRedux = JSON.parse(localStorage.getItem('state'));
      notRedux.user.assertions += 1;
      localStorage.setItem('state', JSON.stringify(notRedux));
    }
    answerButtonClicked();
  }

  render() {
    const { correctAnswer, incorrectAnswers, answerClicked } = this.props;
    return (
      <ul>
        <li>
          <button
            disabled={ !answerClicked }
            type="button"
            data-testid="correct-answer"
            onClick={ this.buttonClicked }
            style={
              answerClicked ? { border: '3px solid rgb(6, 240, 15)' } : null
            }
            name="correctAnswer"
          >
            {correctAnswer}
          </button>
        </li>
        {incorrectAnswers.map((answer, index) => (
          <li key={ index }>
            <button
              disabled={ !answerClicked }
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.answerButtonClicked }
              style={
                answerClicked ? { border: '3px solid rgb(255, 0, 0)' } : null
              }
              name="IncorrectAnswer"
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  answerClicked: state.gameReducer.answerClicked,
});

const mapDispatchToProps = (dispatch) => ({
  answerButtonClicked: () => dispatch(answerButtonClicked()),
});

Answers.propTypes = {
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.array,
  answerClicked: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
