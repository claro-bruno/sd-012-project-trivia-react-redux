import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TiHome } from 'react-icons/ti';

class PlayAgainButton extends Component {
  render() {
    return (
      <Link to="/">
        <button
          className="home-btn"
          data-testid="btn-play-again"
          type="button"
        >
          <TiHome />
        </button>
      </Link>
    );
  }
}

export default PlayAgainButton;
