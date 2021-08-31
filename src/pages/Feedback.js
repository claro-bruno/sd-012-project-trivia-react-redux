import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const scoreMedia = 3;

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;

    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text"> Página de Feedback </h1>
        <p data-testid="feedback-text">
          {
            assertions >= scoreMedia
              ? 'Mandou bem!'
              : 'Podia ser melhor...'
          }
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ gameReducer: { assertions } }) => ({
  assertions,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;
