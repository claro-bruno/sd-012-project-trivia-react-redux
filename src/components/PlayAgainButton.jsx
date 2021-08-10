import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlayAgainButton extends Component {
  render() {
    return (
      <Link to="/">
        <button
          data-testid="btn-play-again"
          type="button"
        >
          Jogar novamente
        </button>
      </Link>
    );
  }
}

export default PlayAgainButton;
