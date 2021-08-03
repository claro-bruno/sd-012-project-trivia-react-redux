import React from 'react';

class Game extends React.Component {
  getToken() {
    return localStorage.getItem('token');
  }

  getQuestions() {
    const token = this.getToken();
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((r) => r.json())
      .then((json) => console.log(json));
  }

  render() {
    return (
      <p>
        Hi,
        <span>{ this.getToken() }</span>
        {this.getQuestions()}
      </p>
    );
  }
}

export default Game;
