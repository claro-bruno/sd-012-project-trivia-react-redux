import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timing: 30,
    };
  }

  count() {
    const { over } = this.props;
    const second = 1000;
    this.timerInterval = setInterval(() => {
      const { timing } = this.state;
      if (timing === 0) {
        over();
        this.stop();
        return;
      }
      this.decrease();
    }, second);
  }

  start() {
    this.count();
  }

  stop() {
    clearInterval(this.timerInterval);
  }

  timer() {
    const { timing } = this.state;
    return timing;
  }

  reset() {
    this.setState({
      timing: 30,
    });
  }

  decrease() {
    const decrease = 1;
    this.setState(({ timing }) => ({ timing: timing - decrease }));
  }

  render() {
    const { timing } = this.state;
    return (
      timing ? <div>{`${timing}`}</div> : <div>Game Over</div>
    );
  }
}

Timer.propTypes = {
  over: PropTypes.func.isRequired,
};

export default Timer;
