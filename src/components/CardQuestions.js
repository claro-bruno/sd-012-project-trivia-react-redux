import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import PropTypes from 'prop-types';
import TimerOffSharpIcon from '@material-ui/icons/TimerOffSharp';

class CardQuestions extends Component {
  constructor(props) {
    super(props);
    this.gif = this.gif.bind(this);
  }

  gif() {
    const { seconds } = this.props;
    if (seconds === 0) {
      return (
        <div>
          <TimerOffSharpIcon />
        </div>
      );
    }
  }

  render() {
    const { questions, questionNumber, seconds } = this.props;
    return (
      <Card>
        <div className="secondsEndCategory">
          <span className="seconds">{seconds}</span>
          <h1 data-testid="question-category">
            { questions[questionNumber].category }
          </h1>
          <span className="gif">{this.gif()}</span>
        </div>
        <p data-testid="question-text" className="asking">
          { questions[questionNumber].question }
        </p>
      </Card>
    );
  }
}

CardQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  })).isRequired,
  questionNumber: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};
export default CardQuestions;
