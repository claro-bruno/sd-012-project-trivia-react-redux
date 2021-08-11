import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { score, assertions } = this.props;
    const assertionsMin = 3;
    return (
      <>
        <Header />
        <div>
          <h3 data-testid="feedback-text">
            {
              (assertions >= assertionsMin)
                ? <span>Mandou bem!</span> : <span>Podia ser melhor...</span>
            }
          </h3>
          <div>
            <p data-testid="feedback-total-score">{score}</p>
            <p data-testid="feedback-total-question">{assertions}</p>
            <Link data-testid="btn-ranking" to="/ranking">
              <button
                data-testid="btn-settings"
                type="button"
              >
                Ver Rankin
              </button>
            </Link>
            <Link data-testid="btn-play-again" to="/">
              <button
                data-testid="btn-settings"
                type="button"
              >
                Jogar Novamente
              </button>
            </Link>
          </div>
          <div>
            <h1>Parabéns! Você concluiu o desafio!</h1>
            <h2>
              Você acertou
              <span data-testid="feedback-total-score"> 0 </span>
              de 5 perguntas.
            </h2>
            <h2>
              Você fez:
              <span data-testid="feedback-total-question"> 0 </span>
              pontos.
            </h2>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.questions.assertions,
  score: state.questions.score,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,

};

export default connect(mapStateToProps)(Feedback);
