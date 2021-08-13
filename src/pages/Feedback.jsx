import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.setKeyRankingLocalStorage = this.setKeyRankingLocalStorage.bind(this);
  }

  setKeyRankingLocalStorage() {
    const getKey = localStorage.getItem('state');
    const state = JSON.parse(getKey);
    const ranking = {
      name: state.player.name,
      score: state.player.score,
      picture: `https://www.gravatar.com/avatar/${state.player.gravatarEmail}`,
    };
    const newLocalStorage = JSON.parse(localStorage.getItem('ranking'));
    localStorage
      .setItem('ranking', JSON.stringify(localStorage.getItem('ranking') === null
        ? [ranking]
        : [...newLocalStorage,
          ranking]));
  }

  render() {
    const { score, assertions } = this.props;
    const avarage = 3;
    return (
      <section className="fieldset-question">
        <Header />
        <h2
          data-testid="feedback-text"
        >
          { assertions >= avarage ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h2>
        <p>
          Pontuação Total:
        </p>

        <span
          data-testid="feedback-total-score"
        >
          { score }
        </span>
        <span>Número de Acertos:</span>
        <p
          data-testid="feedback-total-question"
        >
          {assertions}
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.setKeyRankingLocalStorage() }
          >
            Ver Ranking
          </button>
        </Link>
      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
};

Feedback.defaultProps = {
  score: 0,
  assertions: 0,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
