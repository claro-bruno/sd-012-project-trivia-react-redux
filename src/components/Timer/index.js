import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const second = 1000;
    this.timer = setInterval(() => this.setState((prevState) => ({
      seconds: prevState.seconds - 1,
    })), second);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.seconds === 1) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        {`Tempo: ${seconds}`}
      </div>
    );
  }
}

export default Timer;
