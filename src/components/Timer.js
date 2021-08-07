import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import { isOver, timePass } from '../redux/actions';

const MAX_TIME = 30;
const Container = styled.div`
  padding: 0.625rem;
  border: 2px solid hsla(0, 0%, 100%, 18.75%);
  border-radius: 1.5rem;
  position: relative;
  overflow: hidden;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;

  &::after {
    content: '';
    position: absolute;
    background: linear-gradient(to right, #f27121, #e94057, #8a2387);
    top: 2px;
    left: 2px;
    width: ${({ theme: { time } }) => `calc(${(time / MAX_TIME) * 100}% - 4px)`};
    height: calc(100% - 4px);
    border-radius: 1.5rem;
    z-index: -100;
  }
`;

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
      <ThemeProvider theme={ { time } }>
        <Container>
          <span>{time}</span>
        </Container>
      </ThemeProvider>
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
