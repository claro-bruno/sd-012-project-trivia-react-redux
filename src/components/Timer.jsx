import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props,
    };
  }

  componentDidMount() {
    const SECOND = 1000;
    this.interval = setInterval(
      () => this.setState((previousTime) => ({ timer: previousTime.timer - 1 })),
      SECOND,
    );
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const minimumTime = 0;
    if (timer === minimumTime) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        { timer }
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number,
}.isRequired;

export default Timer;
