import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { actionDisabled, actionTimer } from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    const { setTimer } = this.props;
    const second = 1000;
    this.myInterval = setInterval(() => {
      const { timer } = this.state;
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => setTimer(timer));
    }, second);
  }

  render() {
    const { timer } = this.state;
    const { setDisabled } = this.props;
    if (timer === 0) {
      clearInterval(this.myInterval);
      setDisabled(true);
    }
    return timer;
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDisabled: (isDisabled) => dispatch(actionDisabled(isDisabled)),
  setTimer: (timer) => dispatch(actionTimer(timer)),
});

Timer.propTypes = {
  setDisabled: func.isRequired,
  setTimer: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
