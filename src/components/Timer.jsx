import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Timer extends Component {
  render() {
    const { answerClicked } = this.props;
    if (answerClicked) {
      return (null);
    }
    return (
      <div>Eu sou um Timer</div>
    );
  }
}

const mapStateToProps = (state) => ({
  answerClicked: state.gameReducer.answerClicked,
});

Timer.propTypes = {
  answerClicked: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Timer);
