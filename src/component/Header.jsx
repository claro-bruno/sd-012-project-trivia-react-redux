import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    const { name, avatar } = this.props;
    return (
      <header className="header-game">
        <img
          data-testid="header-profile-picture"
          src={ avatar }
          alt="Avatar do Jogador"
        />
        <h3 data-testid="header-player-name">
          { `Player: ${name}` }
        </h3>
        <h3 data-testid="header-score">{ `Score: ${score}` }</h3>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default Header;
