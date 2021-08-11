import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const assertionsMin = 3;
    return (
      <>
        <Header />
        <div>
          <h3 data-testid="feedback-text">
            {
              (assertios >= assertionsMin ? 'Mandou bem!' : 'Podia ser melhor...')
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
  assertions: state.reducer.assertions,
});

export default connect(mapStateToProps)(Feedback);
