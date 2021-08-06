import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerDecrement, updateGlobalKey } from '../redux/actions/timer';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate(prevProps) {
    const { changeGlobal } = this.props;
    if (prevProps.time <= 0) {
      clearInterval(this.interval);
      changeGlobal(true);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer() {
    const oneSecond = 1000;
    const { setTime } = this.props;
    this.interval = setInterval(() => {
      setTime();
    }, oneSecond);
  }

  render() {
    const { time } = this.props;
    console.log('time');
    return (
      <div>{ time }</div>
    );
  }
}

const mapStateToProps = (state) => ({
  globalKey: state.questions.globalKey,
  time: state.questions.time,
});

const mapDispatchToProps = (dispatch) => ({
  setTime: () => dispatch(timerDecrement()),
  changeGlobal: (status) => dispatch(updateGlobalKey(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  time: PropTypes.number,
  setTime: PropTypes.func,
}.isRequired;
