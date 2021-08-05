import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './question.css';
import Timer from './Timer';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      seconds: 30,
      disabled: false,
    };

    this.changeColorsAnswer = this.changeColorsAnswer.bind(this);
    this.count = this.count.bind(this);
  }

  componentDidMount() {
    this.count();
  }

  count() {
    const sec = 1000;
    const interval = setInterval(() => {
      const { seconds } = this.state;
      this.setState({
        seconds: seconds - 1,
      });
      if (seconds === 1) {
        clearInterval(interval);
        this.setState({
          seconds: 'Time\'s Up',
          disabled: true,
        });
      }
    }, sec);
  }

  changeColorsAnswer() {
    const correct = document.getElementById('questionCorrect');
    const incorrect = document.getElementsByName('questionWrong');
    incorrect.forEach((question) => { question.className = 'questionWrong'; });
    correct.className = 'questionCorrect';
  }

  render() {
    const { index, disabled } = this.state;
    const { questions } = this.props;

    return (
      <div>
        { !questions.length
          ? null
          : (
            <div className="question-container">
              <p className="question-category" data-testid="question-category">
                <span className="category">Category:</span>
                {`${questions[index].category}`}
              </p>
              <p data-testid="question-text" className="question-text">
                <span className="question">Question:</span>
                {`${questions[index].question}`}
              </p>
              <button
                disabled={ disabled }
                className="correct-answer"
                type="button"
                data-testid="correct-answer"
                id="questionCorrect"
                onClick={ this.changeColorsAnswer }
              >
                {questions[index].correct_answer}

              </button>
              {questions[index].incorrect_answers.map((incorrect, i) => (
                <button
                  className="incorrect-answer"
                  type="button"
                  key={ index }
                  data-testid={ `wrong-answer-${i}` }
                  name="questionWrong"
                  onClick={ this.changeColorsAnswer }
                >
                  {incorrect}

                </button>
              ))}
            </div>
          )}
        <Timer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Question);
