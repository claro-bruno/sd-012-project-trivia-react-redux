import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const controlNumber = 3;
    const { playerAsserts, playerScore } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {
            playerAsserts < controlNumber ? 'Podia ser melhor...' : 'Mandou bem!'
          }
        </p>
        <p data-testid="feedback-total-score">{playerScore}</p>
        <p data-testid="feedback-total-question">{playerAsserts}</p>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar novamente
          </button>
        </Link>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  playerAsserts: state.score.asserts,
  playerScore: state.score.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  nameUser: PropTypes.string,
  emailUser: PropTypes.string,
}.isRequired;
