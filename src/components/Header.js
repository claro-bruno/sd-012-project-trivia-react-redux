import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { profilePicture, name, score } = this.props;
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
  profilePicture: state.user.profilePicture,
  name: state.user.name,
  score: state.trivia.score,
});

Header.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
