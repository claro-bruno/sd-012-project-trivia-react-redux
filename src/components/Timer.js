import React, { Component } from 'react';
import './timer.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
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
        });
      }
    }, sec);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div className="timer">
        <p>Timer</p>
        <span>
          {
            seconds
          }
        </span>
      </div>
    );
  }
}

export default Timer;
