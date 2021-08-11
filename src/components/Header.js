import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../pages/styles/header.css';

class Header extends React.Component {
  render() {
    const { name, score, profilePicture } = this.props;
    return (
      <header className="header-content">
        <div className="img-name">
          <img
            data-testid="header-profile-picture"
            src={ profilePicture }
            alt="foto-perfil"
            className="profile-picture-header"
          />
          <span data-testid="header-player-name">{ name }</span>
        </div>
        <br />
        <span data-testid="header-score" className="score-header">{ score }</span>
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
