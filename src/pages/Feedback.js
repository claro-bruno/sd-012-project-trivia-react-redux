import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends React.Component {
  render() {
    const controlNumber = 3;
    const { playerAsserts, playerScore } = this.props;
    return (
      <div className="feedback">
        <Header />
        <div className="div-messages">
          <div className="div-score">
            <p className="correct-questions" data-testid="feedback-total-question">
              Correct questions:
              { playerAsserts }
            </p>
            <p className="correct-questions" data-testid="feedback-total-score">
              Score:
              {playerScore}
            </p>
          </div>
          <div className="div-msg">
            <p data-testid="feedback-text">
              {
                playerAsserts < controlNumber ? 'Podia ser melhor...' : 'Mandou bem!'
              }
            </p>
          </div>
        </div>
        <div className="div-btn">
          <Link to="/ranking">
            <button
              className="btn-ranking"
              data-testid="btn-ranking"
              type="button"
            >
              Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              className="btn-play-again"
              data-testid="btn-play-again"
              type="button"
            >
              Play again
            </button>
          </Link>
        </div>
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
