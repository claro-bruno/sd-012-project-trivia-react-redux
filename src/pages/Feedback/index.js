import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  constructor() {
    super();
    this.performPlayer = this.performPlayer.bind(this);
  }

  performPlayer() {
    const { assertions } = this.props;
    const moreAssertion = 'Mandou bem!';
    const lessAssertion = 'Podia ser melhor...';
    const numberAssertions = 3;
    return (assertions >= numberAssertions) ? moreAssertion : lessAssertion;
  }

  render() {
    const { gravatarEmail, name, score, assertions } = this.props;
    const encodeEmail = md5(gravatarEmail).toString();
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${encodeEmail}` }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        <h1 data-testid="feedback-text">Feedback</h1>
        <p data-testid="feedback-text">{ this.performPlayer() }</p>
        <div>
          <p>
            {'Pontuação: '}
            <span data-testid="feedback-total-score">
              {score}
            </span>
          </p>
          <p>
            {'Acertou '}
            <span data-testid="feedback-total-question">
              {assertions}
            </span>
            {' perguntas'}
          </p>
          <div>
            <Link to="/">
              <button type="button" data-testid="btn-play-again">
                Jogar novamente
              </button>
            </Link>
            <Link to="/ranking">
              <button
                type="button"
                data-testid="btn-ranking"
              >
                Ver Ranking
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
