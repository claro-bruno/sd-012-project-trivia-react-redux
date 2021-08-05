import React, { Component } from 'react';
import TriviaQuestions from '../components/TriviaQuestions';
import UserProfile from '../components/UserProfile';

class GamePage extends Component {
  render() {
    return (
      <div>
        <section className="player-game-section">
          <UserProfile />
          <TriviaQuestions />
        </section>
      </div>
    );
  }
}

export default GamePage;
