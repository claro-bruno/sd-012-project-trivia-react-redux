import React, { Component } from 'react';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="ranking-title">Ranking</h2>
      </div>
    );
  }
}

export default Ranking;
