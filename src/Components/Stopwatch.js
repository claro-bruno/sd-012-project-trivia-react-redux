import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import {
  isAnsweringAction,
  isOutOfTimeAction,
  isQuestionAnsweredAction,
  remainingTimeAction,
  timerCallbacks,
} from '../redux/actions';

const millisecondsPerQuestion = 30000;
const oneSecond = 1000;
const counterDecrement = 1;

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: millisecondsPerQuestion / oneSecond,
    };
    this.updateCounter = this.updateCounter.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
  }

  componentDidMount() {
    const { dispatchCallbacks } = this.props;
    dispatchCallbacks(this.startTimer, this.stopTimer);
    this.startTimer();
  }

  componentDidUpdate() {
    const { dispatchRemainingTime } = this.props;
    const { counter } = this.state;
    dispatchRemainingTime(counter);
  }

  componentWillUnmount() {
    this.resetTimer();
  }

  updateCounter() {
    const { counter } = this.state;
    this.setState({ counter: (counter - counterDecrement) });
  }

  resetCounter() {
    this.setState({ counter: millisecondsPerQuestion / oneSecond });
  }

  startTimer() {
    this.resetCounter();
    const { dispatchIsAnswering } = this.props;
    dispatchIsAnswering();
    this.interval = setInterval(this.updateCounter, oneSecond);
    this.timeout = setTimeout(this.endTimer, millisecondsPerQuestion);
  }

  stopTimer() {
    const { dispatchIsQuestionAnswered } = this.props;
    dispatchIsQuestionAnswered();
    this.resetTimer();
  }

  endTimer() {
    const { dispatchIsOutOfTime } = this.props;
    dispatchIsOutOfTime();
    this.resetTimer();
  }

  resetTimer() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  render() {
    const { className } = this.props;
    const { counter } = this.state;
    return (
      <Typography
        className={ className }
        variant="h2"
        component="h1"
      >
        {counter}
      </Typography>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRemainingTime: (counter) => dispatch(remainingTimeAction(counter)),
  dispatchIsOutOfTime: (isOutOfTime) => dispatch(isOutOfTimeAction(isOutOfTime)),
  dispatchIsQuestionAnswered: (isQuestionAnswered) => dispatch(
    isQuestionAnsweredAction(isQuestionAnswered),
  ),
  dispatchIsAnswering: (isAnswering) => dispatch(isAnsweringAction(isAnswering)),
  dispatchCallbacks: (startCallback, stopCallback) => dispatch(
    timerCallbacks(startCallback, stopCallback),
  ),
});

export default connect(null, mapDispatchToProps)(Stopwatch);

Stopwatch.propTypes = {
  dispatchRemainingTime: PropTypes.func.isRequired,
  dispatchIsOutOfTime: PropTypes.func.isRequired,
  dispatchIsQuestionAnswered: PropTypes.func.isRequired,
  dispatchIsAnswering: PropTypes.func.isRequired,
  dispatchCallbacks: PropTypes.func.isRequired,
  className: PropTypes.shape().isRequired,
};
