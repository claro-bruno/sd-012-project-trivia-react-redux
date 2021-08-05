import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import optionsDisabled from '../redux/actions/optionsDisabled';
import { sendCronometer } from '../redux/actions/questions';

class Cronometer extends Component {
  componentDidMount() {
    const { setCronometer } = this.props;
    const oneSecond = 1000;
    this.interval = setInterval(() => {
      setCronometer();
    }, oneSecond);
  }

  componentDidUpdate(prevProps) {
    const { setOptionsDisabled } = this.props;
    if (prevProps.stopTime) clearInterval(this.interval);
    if (prevProps.time <= 0) {
      setOptionsDisabled();
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { cronometerStatus, time } = this.props;
    if (cronometerStatus) {
      return (<div>0</div>);
    }
    return (
      <div>{ time }</div>
    );
  }
}

const mapStateToProps = (state) => ({
  cronometerStatus: state.questions.optionsDisabled,
  stopTime: state.questions.stopTime,
  time: state.questions.time,
});

const mapDispatchToProps = (dispatch) => ({
  setOptionsDisabled: () => dispatch(optionsDisabled()),
  setCronometer: (time) => dispatch(sendCronometer(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);

Cronometer.propTypes = ({
  cronometerStatus: PropTypes.bool,
  stopTime: PropTypes.bool,
  time: PropTypes.number,
  setOptionsDisabled: PropTypes.func,
  setCronometer: PropTypes.func,
}).isRequired;
