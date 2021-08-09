import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Score from '../Components/Score';

const minAssertions = 3;

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    return (
      <>
        <h1
          data-testid="feedback-text"
        >
          {assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h1>
        <Header />
        <Score dataTestId="header-score" />
        {/* No requisito 12 o teste procura este Id */}
        <Score dataTestId="feedback-total-score" />
        {/* No requisito 14 o teste procura por este Id */}
        <h1
          data-testid="feedback-total-question"
        >
          {assertions}
        </h1>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.user.assertions,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};
