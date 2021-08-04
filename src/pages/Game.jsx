import React, { Component } from 'react';
import HeaderGame from '../components/HeaderGame';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <header>
        <HeaderGame />
      </header>
    );
  }
}

export default Game;
