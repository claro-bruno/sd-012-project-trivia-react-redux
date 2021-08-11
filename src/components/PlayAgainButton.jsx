import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlayAgainButton extends Component {
  render() {
    return (
      <Link to="/">
        <button
          className="home-btn"
          data-testid="btn-play-again"
          type="button"
        >
          <img
            src="https://img.icons8.com/material-outlined/48/000000/home--v2.png"
            alt="home"
          />
        </button>
      </Link>
    );
  }
}

export default PlayAgainButton;
