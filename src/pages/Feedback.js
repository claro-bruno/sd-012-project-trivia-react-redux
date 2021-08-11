import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { actionResetGame, actionResetSettings } from '../redux/actions';
import Footer from '../components/Footer';
import congrats from '../images/congrats.svg';

const IMG_URL = 'https://st2.depositphotos.com/1575949/9163/v/950/depositphotos_91632748-stock-illustration-keep-trying-red-stamp-text.jpg';

class Feedback extends Component {
  renderScoreAndAssertions(score, assertions) {
    return (
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <div
          className="w-2/3 h-4/5 flex flex-col
          justify-center items-center border-dashed border-black border-2"
        >
          <p className="text-2xl">
            Total de pontos:
            {' '}
            <span data-testid="feedback-total-score">{ score }</span>
          </p>
          <p className="text-2xl">
            Total de acertos:
            {' '}
            <span data-testid="feedback-total-question">{ assertions }</span>
          </p>
        </div>
      </div>
    );
  }

  renderButtons(resetGame, resetSettings) {
    return (
      <div className="w-1/2 flex flex-col justify-center items-center">
        <Link to="/" onClick={ () => { resetGame(); resetSettings(); } }>
          <button
            type="button"
            data-testid="btn-play-again"
            className="btn-green rounded-md py-1 px-3 my-3 shadow-xl text-2xl"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking" onClick={ () => { resetGame(); resetSettings(); } }>
          <button
            type="button"
            data-testid="btn-ranking"
            className="btn-yellow rounded-md py-1 px-3 my-3 shadow-xl text-2xl"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }

  render() {
    const { assertions, score, resetGame, resetSettings } = this.props;
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
            <img
              src={ assertions < NUMBER_THREE ? IMG_URL : congrats }
              alt="Foto de Parabéns"
              className="max-h-52"
            />
          </div>
          <div className="flex w-3/5 justify-center">
            { this.renderScoreAndAssertions(score, assertions) }
            { this.renderButtons(resetGame, resetSettings) }
          </div>
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
  resetSettings: () => dispatch(actionResetSettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
};
