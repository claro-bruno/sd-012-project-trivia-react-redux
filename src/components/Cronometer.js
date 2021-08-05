import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import optionsDisabled from '../redux/actions/optionsDisabled';
import { sendCronometer } from '../redux/actions/questions';

class Cronometer extends Component {
  componentDidMount() {
    const { sCronometer } = this.props;
    const oneSecond = 1000;
    this.interval = setInterval(() => {
      // this.setState((prevState) => ({ time: prevState.time - 1 }));
      sCronometer();
    }, oneSecond);
    // const thirtySecond = 30000;
    // this.interval = setInterval(() => {
    //   this.setState({ timeOver: true });
    // }, thirtySecond);
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

  // componentDidUpdate(prevState) {
  //   const { time } = this.state;
  //   if (time <= 0) {
  //     this.stateUpdate();
  //   }
  // }

  // stateUpdate() {
  //   this.setState({ timeOver: true });
  // }

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
  sCronometer: (time) => dispatch(sendCronometer(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);

Cronometer.propTypes = ({
  optionsDisabled: PropTypes.bool,
  setOptionsDisabled: PropTypes.func,
}).isRequired;
