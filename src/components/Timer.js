import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      counting: true,
    };

    this.initTimer = this.initTimer.bind(this);
  }

  componentDidMount() {
    this.initTimer();
  }

  initTimer() {
    const second = 1;
    const milliSeconds = 1000;

    setInterval(() => {
      const { counting, timer } = this.state;
      if (timer === 0) {
        this.setState({
          counting: false,
        });
        return;
      }
      if (counting) {
        const count = timer - second;
        this.setState({
          timer: count,
        });
      }
    }, milliSeconds);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <p>{ timer }</p>
      </div>
    );
  }
}

export default Timer;
