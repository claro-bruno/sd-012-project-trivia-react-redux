import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();
    this.timerCd = this.timerCd.bind(this);
    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    this.timerCd();
    const cd = 30000;
    const { disableAnswer } = this.props;
    setTimeout(() => disableAnswer(), cd);
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time > 0) {
      this.timerCd();
    }
  }

  timerCd() {
    const { time } = this.state;
    const delay = 1000;
    if (time > 0) {
      setTimeout(() => this.setState({
        time: time - 1,
      }), delay);
    }
  }

  render() {
    const { time } = this.state;
    return (
      <span id="time">{ time }</span>
    );
  }
}

Timer.propTypes = {
  disableAnswer: PropTypes.func.isRequired,
};

export default Timer;
