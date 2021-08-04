import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <Header />
    );
  }
}

export default connect()(Game);
