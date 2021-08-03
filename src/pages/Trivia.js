import React, { Component } from 'react';
import { connect } from 'react-redux';

class Trivia extends Component {
  render() {
    return (
      <div>
        <span>Trivia</span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.trivia.questions,
  };
}

export default connect(mapStateToProps)(Trivia);
