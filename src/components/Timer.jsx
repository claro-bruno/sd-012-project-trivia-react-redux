import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 2,
    };
    this.count = this.count.bind(this);
  }

  componentDidMount() {
    this.count();
  }

  count() {
    setInterval(() => {
      const { seconds } = this.state;
      this.setState({
        seconds: seconds < 0 || seconds.type === 'string' ? 'Times Up' : seconds - 1,
      });
    }, 1000);
  }

  render() {
    const { seconds } = this.state;
    return (
      <>
        <p>Timer</p>
        <span>
          {
            seconds
          }
        </span>
      </>
    );
  }
}

export default Timer;
