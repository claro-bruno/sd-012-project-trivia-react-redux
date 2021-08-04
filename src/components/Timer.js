import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      time: 30,
      over: false,
    };

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    const oneSecond = 100;
    const { time } = this.state;
    setInterval(
      () => this.setState(
        (prevState) => ({ time: prevState.time > 0 ? prevState.time - 1 : 0 }),
      ), oneSecond,
    );
  time > 
  }

  render() {
    const { time } = this.state;
    return (
      <p>{time}</p>
    );
  }
}

export default Timer;
