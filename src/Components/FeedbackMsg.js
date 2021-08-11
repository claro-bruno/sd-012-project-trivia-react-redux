import React from 'react';
import PropTypes from 'prop-types';

class FeedbackMsg extends React.Component {
  render() {
    const { assertions } = this.props;
    const validResult = 3;
    return (
      <div>
        <p
          data-testid="feedback-text"
        >
          { (assertions < validResult) ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
      </div>
    );
  }
}

FeedbackMsg.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default FeedbackMsg;
