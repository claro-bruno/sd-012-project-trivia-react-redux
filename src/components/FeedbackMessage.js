import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackMessage extends React.Component {
  render() {
    const { playerScore } = this.props;
    const goodPerfomanceNumber = 3;
    return (
      <h1
        data-testid="feedback-text"
      >
        {
          playerScore < goodPerfomanceNumber
            ? 'Podia ser melhor...'
            : 'Mandou bem!'
        }
      </h1>
    );
  }
}

FeedbackMessage.propTypes = {
  playerScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerScore: state.game.score,
});

export default connect(mapStateToProps)(FeedbackMessage);
