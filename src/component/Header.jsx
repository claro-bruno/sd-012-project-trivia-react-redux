import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, avatar } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ avatar }
          alt="Avatar do Jogador"
        />
        <span data-testid="header-player-name">
          { name }
        </span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default Header;
