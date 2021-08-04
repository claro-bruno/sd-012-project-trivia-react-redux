import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isOver, updateTime } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      time: 30,
    };

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    const { over, setTime } = this.props;
    const { time } = this.state;
    if (!over) return setTime(time) && this.over();
  }

  timer() {
    const oneSecond = 1000;
    setInterval(
      () => this.setState(
        (prevState) => ({ time: prevState.time > 0 ? prevState.time - 1 : 0 }),
      ), oneSecond,
    );
  }

  over() {
    const { time } = this.state;
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
  setTime: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  timeIsOver: () => dispatch(isOver()),
  setTime: (time) => dispatch(updateTime(time)),
});

const mapStateToProps = (state) => ({
  over: state.userInfo.over,
  time: state.userInfo.time,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
