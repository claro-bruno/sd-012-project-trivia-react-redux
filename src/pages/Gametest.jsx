import React, { Component } from 'react';
import HeaderGame from '../components/HeaderGame';
import Game from './Game';

class Gametest extends Component {
  render() {
    return (
      <div>
        <HeaderGame />
        <Game />
      </div>
    );
  }
}

export default Gametest;
