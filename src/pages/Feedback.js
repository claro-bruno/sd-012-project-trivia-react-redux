import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

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
