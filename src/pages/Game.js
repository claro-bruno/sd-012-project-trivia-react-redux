import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  render() {
    return (
      <section>
        <h3>Question Description</h3>
        <h3 data-testid="question-category">Category</h3>
        <h3 data-testid="question-text">Question</h3>
        <ul>
          <li />
        </ul>
      </section>
    );
  }
}

export default Game;
