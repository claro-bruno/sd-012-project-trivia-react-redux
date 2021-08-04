import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import optionsDisabled from '../redux/actions/optionsDisabled';

class Cronometer extends Component {
  constructor() {
    super();

    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, oneSecond);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { setOptionsDisabled } = this.props;
    if (prevState.time <= 0) {
      setOptionsDisabled();
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { time } = this.state;
    const { cronometerStatus } = this.props;

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
});

const mapDispatchToProps = (dispatch) => ({
  setOptionsDisabled: () => dispatch(optionsDisabled()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cronometer);

Cronometer.propTypes = ({
  optionsDisabled: PropTypes.bool,
  setOptionsDisabled: PropTypes.func,
}).isRequired;
