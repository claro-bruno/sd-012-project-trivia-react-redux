import React, { Component } from 'react';
import Header from '../Components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <div
        data-testid="feedback-text"
      >
        <Header />
      </div>
    );
  }
}
