import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import GameBody from './GameBody';

class Gametest extends Component {
  render() {
    return (
      <div>
        <HeaderGame />
        <GameBody />
      </div>
    );
  }
}

export default Gametest;
