import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './styles/feedback.css';

class Feedback extends React.Component {
  componentDidMount() {
    const { score, name, profilePicture } = this.props;
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    const obj = {
      name,
      score,
      picture: profilePicture,
    };
    if (ranking) {
      ranking = [...ranking, obj];
    } else {
      ranking = [obj];
    }
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { score, assertions } = this.props;
    const minimalGuess = 3;
    return (
      <div className="feedback-content">
        <div className="feedback-container">
          <Header />
          <h1 className="feedback-title">Feedback</h1>
          <h2
            data-testid="feedback-text"
            className="feedback-text"
          >
            { assertions < minimalGuess ? 'Podia ser melhor...' : 'Mandou bem!' }
          </h2>
          <div className="feedback-results">
            <h3>Pontuação</h3>
            <p
              data-testid="feedback-total-score"
            >
              { score }
            </p>
          </div>
          <div className="feedback-results">
            <h3>Acertos</h3>
            <p
              data-testid="feedback-total-question"
            >
              { assertions }
            </p>
          </div>
          <Link className="btn" to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
          <Link className="btn" to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  profilePicture: state.player.profilePicture,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
