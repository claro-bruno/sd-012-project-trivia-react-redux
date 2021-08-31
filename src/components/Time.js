import React from 'react';
import PropTypes from 'prop-types';

const interval = 1000;
const maxTime = 30;

class Time extends React.Component {
  constructor() {
    super();

    this.state = {
      timer: maxTime,
      setIntervalRef: null,
    };
  }

  componentDidMount() {
    this.timerControl();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const { timer, setIntervalRef } = nextState;

    if (timer === 0 && setIntervalRef) {
      this.clearTimer(setIntervalRef);
      return false;
    }

    return true;
  }

  timerControl() {
    const ref = setInterval(() => {
      this.setState((previousState) => ({
        timer: previousState.timer - 1,
      }));
    }, interval);

    this.setState({
      setIntervalRef: ref,
    });
  }

  clearTimer(setIntervalRef) {
    const { toggleDisableButtons } = this.props;

    clearInterval(setIntervalRef);

    toggleDisableButtons();

    this.setState({
      timer: 0,
      setIntervalRef: null,
    });
  }

  render() {
    const { timer } = this.state;

    return (
      <span>{ `Tempo: ${timer}` }</span>
    );
  }
}

export default Time;

Time.propTypes = {
  toggleDisableButtons: PropTypes.func,
}.isRequired;
