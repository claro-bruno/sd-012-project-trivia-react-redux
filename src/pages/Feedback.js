import React from 'react';
import FeedBackHeader from '../components/FeedBackHeader';
import ButtonToRanking from '../components/ButtonToRanking';
// import Ranking from './Ranking';

class Feedback extends React.Component {
  constructor() {
    super();
    this.rankingBtn = this.rankingBtn.bind(this);
  }

  rankingBtn() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <FeedBackHeader />
        <ButtonToRanking
          onClick={ this.rankingBtn }
        />
      </div>
    );
  }
}

export default Feedback;
