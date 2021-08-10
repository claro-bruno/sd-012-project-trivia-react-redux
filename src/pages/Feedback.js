import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Style/feedBack.css';
import { fetchGravatarImage } from '../services/api';

class Feedback extends Component {
  async componentDidMount() {
    const { name, score, email } = this.props;
    const picture = await fetchGravatarImage(email);
    const user = {
      name,
      score,
      picture,
    };
    const saveRanking = JSON.parse(localStorage.getItem('ranking'));
    if (!saveRanking) {
      localStorage.setItem('ranking', JSON.stringify([user]));
    } else {
      const newRanking = [...saveRanking, user].sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  render() {
    const ASSERTIONS_CHECK = 3;
    const { assertions, score } = this.props;

    return (
      <div className="feedback-screen">
        <h2 data-testid="feedback-text">
          { assertions < ASSERTIONS_CHECK ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h2>
        <div>
          <h3 data-testid="feedback-total-score">
            Score:
            { score }
          </h3>
          <h3 data-testid="feedback-total-question">
            Right answers:
            { assertions }
          </h3>
        </div>
        <Link to="/">
          <button className="btn-feedBack" type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/game/ranking">
          <button className="btn-feedBack" type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.user.name,
  email: state.player.user.email,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
