import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export class PlayerHeader extends Component {
  render() {
    const { nome, score } = this.props;
    return (
      <div>
        <header>
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="Imagem do jogador"
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name">{ nome }</h2>
          <h2 data-testid="header-score">
            Placar:
            { score }
          </h2>
        </header>
      </div>
    );
  }
}

PlayerHeader.propTypes = {
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default PlayerHeader;
