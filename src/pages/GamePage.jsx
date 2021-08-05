import React, { Component } from 'react';
import UserProfile from '../components/UserProfile';

class GamePage extends Component {
  render() {
    return (
      <div>
        <section>
          <UserProfile />
        </section>
      </div>
    );
  }
}

export default GamePage;
