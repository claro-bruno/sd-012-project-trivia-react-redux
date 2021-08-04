import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Trivia />
      </div>
    );
  }
}

export default connect()(Game);
