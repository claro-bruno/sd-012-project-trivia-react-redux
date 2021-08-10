import React, { Component } from 'react';
import PropTypes from 'prop-types';

// https://www.youtube.com/watch?v=NAx76xx40jM&ab_channel=CodingEntrepreneurs
// uma forte ajuda para destravar a mente: https://github.com/tryber/sd-012-project-trivia-react-redux/pull/292/commits/b4ad4f6b44f9fa67ad33341f2f958e25fb5f5848

const endTime = 0;
const oneSecond = 1000;

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      time: 30,
    };
    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, oneSecond);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { changeClassStyle } = this.props;
    if (prevState.time === endTime) {
      clearInterval(this.interval);
      changeClassStyle();
      this.countdown();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countdown() {
    this.setState({
      time: 0,
    });
  }

  render() {
    const { time } = this.state;
    return (
      <section className="timer-section">
        <span className="timer-value">{ time }</span>
      </section>
    );
  }
}

Timer.propTypes = {
  changeClassStyle: PropTypes.func.isRequired,
};

export default Timer;
