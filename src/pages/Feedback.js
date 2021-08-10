import React, { Component } from 'react';
import UserProfile from '../components/UserProfile';

export default class extends Component {
  render() {
    return (
      <div>
        <UserProfile />
        <p data-testid="feedback-text">Feedback</p>
      </div>
    );
  }
}
