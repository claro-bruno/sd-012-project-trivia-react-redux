import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
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
      </div>
    );
  }
}

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
