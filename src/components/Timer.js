import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isOver, timePass } from '../redux/actions';

class Timer extends Component {
  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    const { over } = this.props;
    if (!over) return this.over();
  }

  timer() {
    const oneSecond = 1000;
    const { passTime } = this.props;
    setInterval(
      () => passTime(), oneSecond,
    );
  }

  over() {
    const { time } = this.props;
    const { timeIsOver } = this.props;
    if (time === 0) {
      return timeIsOver();
    }
  }

  render() {
    const { time } = this.props;
    return (
      <p>
        {time}
      </p>
    );
  }
}

Timer.propTypes = {
  timeIsOver: PropTypes.func.isRequired,
  over: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  passTime: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  timeIsOver: () => dispatch(isOver()),
  passTime: () => dispatch(timePass()),
});

const mapStateToProps = (state) => ({
  over: state.userInfo.over,
  time: state.userInfo.time,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
