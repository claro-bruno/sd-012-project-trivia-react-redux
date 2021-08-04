import React from 'react';

class Feedback extends React.Component {
  render() {
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          data-testid="header-profile-picture"
          alt="Avatar"
        />
        <span data-testid="header-player-name">
          Player name:
          { userName }
        </span>
        <span data-testid="header-score">
          Score:
          { score }
        </span>
      </header>
    );
  }
}

export default Feedback;
