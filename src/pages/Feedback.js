import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { actionResetGame } from '../redux/actions';
import Footer from '../components/Footer';

class Feedback extends Component {
  render() {
    const { assertions, score, resetGame } = this.props;
    const NUMBER_THREE = 3;

    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          {
            assertions < NUMBER_THREE ? 'Podia ser melhor...' : 'Mandou bem!'
          }
        </p>
        <p>
          Total de pontos:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <p>
          Total de acertos:
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <Link to="/" onClick={ () => resetGame() }>
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking" onClick={ () => resetGame() }>
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.gameReducer.assertions,
  score: state.gameReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(actionResetGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
};
