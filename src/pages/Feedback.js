import React from 'react';
import PropTypes from 'prop-types';
import FeedbackHeader from '../components/FeedbackHeader';
import ButtonRanking from '../components/ButtonRanking';

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
        <FeedbackHeader />
        <ButtonRanking
          itemName="Ver Ranking"
          testId="btn-ranking"
          onClick={ this.rankingBtn }
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf('string').isRequired,
};

export default Feedback;
