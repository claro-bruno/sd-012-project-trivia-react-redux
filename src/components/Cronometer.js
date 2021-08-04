import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import optionsDisabled from '../redux/actions/optionsDisabled';

class Cronometer extends Component {
  constructor() {
    super();

    this.state = {
      time: 30,
      // timeOver: false,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, oneSecond);

    // const thirtySecond = 30000;
    // this.interval = setInterval(() => {
    //   this.setState({ timeOver: true });
    // }, thirtySecond);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { setOptionsDisabled } = this.props;
    console.log('estado:', prevState.time);
    if (prevState.time <= 0) {
      setOptionsDisabled();
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
