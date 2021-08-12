import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RankingButton extends Component {
  render() {
    return (
      <Link to="/ranking">
        <button
          className="ranking-btn"
          type="button"
          data-testid="btn-ranking"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/000000/leaderboard.png"
            alt="ranking"
          />
        </button>
      </Link>
    );
  }
}

export default RankingButton;
