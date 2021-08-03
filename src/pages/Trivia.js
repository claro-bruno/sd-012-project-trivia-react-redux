import React, { Component } from 'react';
import { connect } from 'react-redux';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
    };
  }

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
