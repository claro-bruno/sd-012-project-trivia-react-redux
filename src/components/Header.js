import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { image, playerName, playerScore } = this.props;
    return (
      <header>
        <img
          src={ image }
          alt={ playerName }
          data-testid="header-profile-picture"
        />
        <h1
          data-testid="header-player-name"
        >
          { playerName }
        </h1>
        <h1
          data-testid="header-score"
        >
          { playerScore }
        </h1>
      </header>
    );
  }
}

Header.propTypes = {
  image: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  image: state.user.image,
  playerName: state.user.name,
  playerScore: 0,
});

export default connect(mapStateToProps)(Header);
