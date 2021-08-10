import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonRanking extends Component {
  render() {
    return (
      <div>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}

export default ButtonRanking;
