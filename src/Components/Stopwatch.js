import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    this.startInterval = this.startInterval.bind(this);
    this.stopInterval = this.stopInterval.bind(this);
    this.endInterval = this.endInterval.bind(this);
  }

  componentDidMount() {
    const { dispatchCallbacks } = this.props;
    dispatchCallbacks(this.startInterval, this.stopInterval);
    this.startInterval();
  }

  componentDidUpdate() {
    const { dispatchRemainingTime } = this.props;
    const { counter } = this.state;
    dispatchRemainingTime(counter);
  }

  updateCounter() {
    const { counter } = this.state;
    this.setState({ counter: (counter - counterDecrement) });
  }

  resetCounter() {
    this.setState({ counter: millisecondsPerQuestion / oneSecond });
  }

  startInterval() {
    this.resetCounter();
    this.resetInterval();
    const { dispatchIsAnswering } = this.props;
    dispatchIsAnswering();
    this.interval = setInterval(this.updateCounter, oneSecond);
    this.timeout = setTimeout(this.endInterval, millisecondsPerQuestion);
    // Aqui vai o que acontece quando o timer começa.
  }

  stopInterval() {
    const { dispatchIsQuestionAnswered } = this.props;
    dispatchIsQuestionAnswered();
    this.resetInterval();
    // Aqui vai o que acontece quando o timer é interrompido por uma resposta.
  }

  endInterval() {
    const { dispatchIsOutOfTime } = this.props;
    dispatchIsOutOfTime();
    clearInterval(this.interval);
    // Aqui vai o que acontece quando o tempo termina sem resposta.
  }

  resetInterval() {
    clearInterval(this.interval);
    clearInterval(this.timeout);
  }

  render() {
    const { counter } = this.state;
    return (
      <h1>{counter}</h1>
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
};
