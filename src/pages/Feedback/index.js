import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    if (assertions >= numberAssertions) {
      return (<p data-testid="feedback-text">{ moreAssertion }</p>);
    }
    return (<p data-testid="feedback-text">{ lessAssertion }</p>);
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
        <div data-testid="feedback-text">FeedBack</div>
        <div>{ this.performPlayer() }</div>
        <div>
          <p>
            Pontuação:
            {' '}
            <span data-testid="feedback-total-score">
              {score}
            </span>
          </p>
          <p>
            Acertou
            {' '}
            <span data-testid="feedback-total-question">
              {assertions}
            </span>
            {' '}
            perguntas
          </p>
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
