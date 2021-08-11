import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerHeaderS from './styles';

class PlayerHeader extends Component {
  render() {
    const { name, score, encodeEmail } = this.props;

    return (
      <PlayerHeaderS>
        <img
          src={ `https://www.gravatar.com/avatar/${encodeEmail}` }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <section>
          <h3 data-testid="header-player-name">{ name }</h3>
          <h4>
            { 'Pontuação: ' }
            <span data-testid="header-score">{ score }</span>
          </h4>
        </section>
      </PlayerHeaderS>
    );
  }
}

PlayerHeader.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  encodeEmail: PropTypes.string.isRequired,
};

export default PlayerHeader;
