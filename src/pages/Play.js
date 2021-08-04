import React from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

export default class Play extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}
