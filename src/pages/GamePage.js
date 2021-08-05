import React from 'react';
import Header from '../components/Header';
import Trivia from '../components/QuestionsAnswers/Trivia';

class GamePage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Trivia />
      </>
    );
  }
}

export default GamePage;
