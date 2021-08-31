import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetTimer, updateTimer } from '../actions';

const interval = 1000;

class Time extends React.Component {
  constructor() {
    super();
    this.state = {
      setIntervalRef: null,
    };
  }

  componentDidMount() {
    this.timerControl();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { setIntervalRef } = nextState;
    const { timer } = nextProps;

    if (timer === 0 && setIntervalRef) {
      this.clearTimer(setIntervalRef);
      return false;
    }

    return true;
  }

  timerControl() {
    const { dispatchtUpdateTimer, dispatchResetTimer } = this.props;

    const ref = setInterval(() => {
      dispatchtUpdateTimer();
    }, interval);

    this.setState({
      setIntervalRef: ref,
    });
    dispatchResetTimer();
  }

  clearTimer(setIntervalRef) {
    const { toggleDisableButtons } = this.props;

    clearInterval(setIntervalRef);

    toggleDisableButtons();

    this.setState({
      setIntervalRef: null,
    });
  }

  render() {
    const { timer } = this.props;

    return (
      <span>{ `Tempo: ${timer}` }</span>
    );
  }
}

const mapStateToProps = ({ gameReducer: { timer } }) => ({
  timer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchtUpdateTimer: () => dispatch(updateTimer()),
  dispatchResetTimer: () => dispatch(resetTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Time);

Time.propTypes = {
  toggleDisableButtons: PropTypes.func,
}.isRequired;
