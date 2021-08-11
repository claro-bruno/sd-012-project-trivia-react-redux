import React, { Component } from 'react';
import GameHeader from '../components/GameHeader';
import Questions from '../components/Questions';
import '../CSS/Game.css';

class Game extends Component {
  render() {
    return (
      <div>
        <GameHeader />
        <Questions />
      </div>
    );
  }
}

export default Game;
