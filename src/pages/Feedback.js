import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { actionResetGame } from '../redux/actions';
import Footer from '../components/Footer';
import congrats from '../images/congrats.svg';

class Feedback extends Component {
  render() {
    const { assertions, score, resetGame } = this.props;
    const NUMBER_THREE = 3;

    return (
      <>
        <Header />
        <div className="w-screen h-main flex flex-col justify-evenly items-center">
          <div
            className="bg-white text-center
            w-3/5 flex flex-col items-center rounded-md py-6"
          >
            <h1
              data-testid="feedback-text"
              className="text-5xl"
            >
              {
                assertions < NUMBER_THREE ? 'Podia ser melhor...' : 'Mandou bem!'
              }
            </h1>
            <img src={ congrats } alt="Foto de Parabéns" />
          </div>
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
        </div>
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
