import React from 'react';
import Header from '../components/Header';
import Timer from '../components/Timer';

class GamePage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Timer />
      </>
    );
  }
}

export default GamePage;
