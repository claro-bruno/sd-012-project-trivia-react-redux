import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState((previousTime) => ({ timer: previousTime.timer - 1 })),
      SECOND,
    );
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const maximumTime = 0;
    if (timer === maximumTime) {
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

export default Timer;
