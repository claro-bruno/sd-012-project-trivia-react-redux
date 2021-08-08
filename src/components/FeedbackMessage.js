import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackMessage extends React.Component {
  render() {
    const { rightQuestions } = this.props;
    const goodPerfomanceNumber = 3;
    return (
      <h1
        data-testid="feedback-text"
      >
        {
          rightQuestions < goodPerfomanceNumber
            ? 'Podia ser melhor...'
            : 'Mandou bem!'
        }
      </h1>
    );
  }
}

FeedbackMessage.propTypes = {
  rightQuestions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  rightQuestions: state.game.assertions,
});

export default connect(mapStateToProps)(FeedbackMessage);
