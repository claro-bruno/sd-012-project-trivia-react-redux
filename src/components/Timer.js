import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerAction, timerRestartChange } from '../redux/action';
import styles from './Question.module.css';

const INITIAL_TIME = 30;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timerCd = this.timerCd.bind(this);
    this.state = {
      time: INITIAL_TIME,
    };
  }

  componentDidMount() {
    this.timerCd();
  }

  componentDidUpdate() {
    const { time } = this.state;
    const { clickAnswer, sendTimer, disableAnswer } = this.props;

    if (time <= 0 || clickAnswer) {
      sendTimer(time);
      disableAnswer();
      clearInterval(this.seconds);
    } else if (time === INITIAL_TIME) {
      this.timerCd();
    }

    this.shouldRestartTimer();
  }

  componentWillUnmount() {
    this.setState({ time: INITIAL_TIME });
    clearInterval(this.seconds);
  }

  shouldRestartTimer() {
    const { restartTimerChange, restartTimer } = this.props;
    if (restartTimer) {
      this.setState({ time: INITIAL_TIME });
      restartTimerChange();
      this.timerCd();
    }
  }

  timerCd() {
    const delay = 1000;
    this.seconds = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, delay);
  }

  render() {
    const { time } = this.state;
    return (
      <div className={ styles.timerContainer }>
        <span>Time:</span>
        <span
          className={ styles.timerQuestion }
          id="time"
        >
          { time }
        </span>
      </div>
    );
  }
}

Timer.propTypes = {
  disableAnswer: PropTypes.func.isRequired,
  sendTimer: PropTypes.func.isRequired,
  restartTimerChange: PropTypes.func.isRequired,
  restartTimer: PropTypes.bool.isRequired,
  clickAnswer: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  restartTimer: state.game.restartTimer,
});

const mapDispatchToProps = (dispatch) => ({
  sendTimer: (time) => dispatch(timerAction(time)),
  restartTimerChange: () => dispatch(timerRestartChange()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
