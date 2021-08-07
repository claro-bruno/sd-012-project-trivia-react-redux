import React from 'react';
import { Link } from 'react-router-dom';
import FinalResults from '../components/FinalResults';
import Header from '../components/Header';

class Feedback extends React.Component {
  rankingBtn() {
    return (
      <Link to="/Ranking">
        <button type="button" data-testid="btn-ranking">
          Ranking
        </button>
      </Link>
    );
  }

  playAgainBtn() {
    return (
      <Link to="/">
        <button type="button" data-testid="btn-play-again">
          Jogar novamente
        </button>
      </Link>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <FinalResults />
        {this.playAgainBtn()}
        {this.rankingBtn()}
      </div>
    );
  }
}

export default Feedback;
