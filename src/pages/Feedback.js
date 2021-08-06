import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const ASSERTION_AVERAGE = 3;

class Feedback extends React.Component {
  render() {
    const { props: { getAssertions } } = this;
    return (
      <>
        <Header />
        <h2 data-testid="feedback-text">
          {
            (getAssertions < ASSERTION_AVERAGE ? 'Podia ser melhor...' : 'Mandou bem!')
          }
        </h2>
      </>
    );
  }
}

const { number } = PropTypes;
// Feedback.propTypes = {
//   player: PropTypes.shape({
//     name: string.isRequired,
//     assertions: number.isRequired,
//     score: number.isRequired,
//     gravatarEmail: string.isRequired,
//   }).isRequired,
// };

Feedback.propTypes = {
  getAssertions: number.isRequired,
};

const mapStateToProps = (state) => ({
  getAssertions: state.addAssertionsReducer.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
