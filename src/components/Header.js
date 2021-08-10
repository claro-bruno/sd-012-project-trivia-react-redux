import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, score, profilePicture } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ profilePicture }
          alt="foto-perfil"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  profilePicture: state.player.profilePicture,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profilePicture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
