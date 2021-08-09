import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextQuestion } from '../redux/actions';

class NextButton extends Component {
  render() {
    const { dispatchNextQuestion, isLastQuestion, history } = this.props;
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ isLastQuestion
          ? () => history.push('/feedback')
          : dispatchNextQuestion }
      >
        Next
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  isLastQuestion: state.game.isLastQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNextQuestion: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);

NextButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchNextQuestion: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
};
