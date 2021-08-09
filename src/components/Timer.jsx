import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noTime } from '../redux/actions/actionTimer';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(
      () => this.setState((previousTime) => ({ timer: previousTime.timer - 1 }), () => {
        const { timer } = this.state;
        const { changeTimer, pauseTimer } = this.props;
        const maximumTime = 0;
        let timeOff = false;
        if (timer === maximumTime || pauseTimer) {
          clearInterval(this.interval);
          timeOff = true;
        }
        changeTimer({ timer, timeOff });
      }),
      ONE_SECOND,
    );
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <p>
          Tempo:
          { timer }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timerReducer.time,
  pauseTimer: state.timerReducer.pauseTimer,
});

const mapDispatchToProps = (dispatch) => ({
  changeTimer: (timer) => dispatch(noTime(timer)),
});

Timer.propTypes = {
  changeTimer: PropTypes.func,
  pauseTimer: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
