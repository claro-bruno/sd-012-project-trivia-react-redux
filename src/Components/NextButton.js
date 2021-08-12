import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { nextQuestion } from '../redux/actions';
import { getRank } from '../data/helpers';

class NextButton extends Component {
  constructor(props) {
    super(props);
    this.handleEndGame = this.handleEndGame.bind(this);
  }

  handleEndGame() {
    const playerScore = JSON.parse(localStorage.getItem('state')) || {};
    const rank = getRank(playerScore);
    const lastRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    localStorage.setItem('ranking', JSON.stringify([...lastRanking, rank]));
    const { history } = this.props;
    history.push('/feedback');
  }

  render() {
    const { dispatchNextQuestion, isLastQuestion, isAnswering, className } = this.props;

    return (
      <Button
        data-testid="btn-next"
        type="button"
        onClick={ isLastQuestion
          ? this.handleEndGame
          : dispatchNextQuestion }
        style={ isAnswering ? { display: 'none' } : { display: 'inline' } }
        className={ className }
      >
        Next
      </Button>
    );
  }
}

const mapStateToProps = (state) => ({
  isLastQuestion: state.game.isLastQuestion,
  isAnswering: state.timer.isAnswering,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNextQuestion: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);

NextButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isAnswering: PropTypes.bool.isRequired,
  dispatchNextQuestion: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};
