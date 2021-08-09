import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  startTimer() {
    const ONE_SECOND = 1000;
    this.timerId = setInterval(() => {
      const { seconds } = this.state;
      this.setState({
        seconds: seconds - 1,
      }, () => {
        const { seconds: newSecond } = this.state;
        if (!newSecond) {
          const { timerOver } = this.props;
          timerOver();
          console.log('Acabou o tempo');
          clearInterval(this.timerId);
        }
      });
    }, ONE_SECOND);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        Tempo:
        {' '}
        {seconds}
      </div>
    );
  }
}

export default Timer;
