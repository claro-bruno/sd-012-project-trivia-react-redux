import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timerAction } from '../actions';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      disabled: false,
      time: 30,
    };

    this.questionTimer = this.questionTimer.bind(this);
    this.makeProps = this.makeProps.bind(this);
  }

  componentDidMount() {
    this.makeProps();
    this.questionTimer();
  }

  // Funcao que conta 30 segundos para responder a pergunta
  questionTimer() {
    const plus = 1000;
    const questionTimer = setInterval(() => {
      const { time } = this.state;
      this.setState({
        time: time - 1,
      });
      if (time <= 0) {
        clearInterval(questionTimer);
        this.setState({
          disabled: true,
          time: 'Tempo Esgostado',
        });
      }
    }, plus);
  }

  makeProps() {
    const { disabled, time } = this.state;
    const { getTime } = this.props;

    getTime(time, disabled);
  }

  render() {
    const { time } = this.state;
    return (
      <span id="timer">
        { time }
      </span>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTime: (timeValue, disableValue) => dispatch(timerAction(timeValue, disableValue)),
});

export default connect(null, mapDispatchToProps)(Timer);

Timer.propTypes = {
  getTime: PropTypes.func,
}.isRequired;
