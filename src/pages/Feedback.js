import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="feedback-text">HELLO STRANGER</p>
        <Header />
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
      </div>);
  }
}

export default Feedback;
