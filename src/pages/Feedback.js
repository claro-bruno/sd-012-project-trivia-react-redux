import React from 'react';
import Header from '../components/Header';

export default class Config extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback Bonito</h1>
      </div>
    );
  }
}
