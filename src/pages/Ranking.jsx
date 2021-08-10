import React from 'react';
import Header from '../components/Header';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
      </>
    );
  }
}

export default Ranking;
