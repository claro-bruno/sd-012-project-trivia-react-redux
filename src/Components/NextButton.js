import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { nextQuestion } from '../redux/actions';

function getRank({ player }) {
  return {
    name: player.name,
    score: player.score,
    picture: `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}`,
  };
}

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
    const { dispatchNextQuestion, isLastQuestion, isAnswering } = this.props;
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ isLastQuestion
          ? this.handleEndGame
          : dispatchNextQuestion }
        style={ isAnswering ? { display: 'none' } : { display: 'inline' } }
      >
        Next
      </button>
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
};
