import React from 'react';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        Página de jogo
        <Question />
      </div>
    );
  }
}

export default Game;
