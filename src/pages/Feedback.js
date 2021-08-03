import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const NUMBER_THREE = 3;

    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          {
            assertions < NUMBER_THREE ? 'Podia ser melhor...' : 'Mandou bem!'
          }
        </p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.gameReducer.assertions, // nome provisório aguardando a criação do reducer do jogo
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};
