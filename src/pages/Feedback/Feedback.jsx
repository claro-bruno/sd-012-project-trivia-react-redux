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
    const { userScore, userAssertions } = this.props;
    const assertionsMin = 3;
    return (
      <>
        <Header />
        <h1>Parabéns! Você concluiu o desafio!</h1>
        <div>
          <h3 data-testid="feedback-text">
            {
              (userAssertions >= assertionsMin)
                ? <span>Mandou bem!</span> : <span>Podia ser melhor...</span>
            }
          </h3>
          <div>
            <h2>
              <span data-testid="feedback-total-score">
                {`Você acertou ${userAssertions} de 5 perguntas.`}
              </span>
            </h2>
            <h2>
              <span data-testid="feedback-total-question">
                {`Você fez: ${userScore} pontos.`}
              </span>
            </h2>
          </div>
          <div>
            <Link data-testid="btn-ranking" to="/ranking">
              <button
                data-testid="btn-settings"
                type="button"
              >
                Ver Rankin
              </button>
            </Link>
            <Link data-testid="btn-play-again" exact to="/">
              <button
                data-testid="btn-settings"
                type="button"
              >
                Jogar Novamente
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userAssertions: state.questions.assertions,
  userScore: state.questions.score,
});

Feedback.propTypes = {
  userScore: PropTypes.number.isRequired,
  userAssertions: PropTypes.number.isRequired,

};

export default connect(mapStateToProps)(Feedback);
