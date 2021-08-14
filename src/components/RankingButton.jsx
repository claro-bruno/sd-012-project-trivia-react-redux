import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TiStarFullOutline } from 'react-icons/ti';

class RankingButton extends Component {
  render() {
    return (
      <Link to="/ranking">
        <button
          className="ranking-btn"
          type="button"
          data-testid="btn-ranking"
        >
          <TiStarFullOutline />
        </button>
      </Link>
    );
  }
}

export default RankingButton;
