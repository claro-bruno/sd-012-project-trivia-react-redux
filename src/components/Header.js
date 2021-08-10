import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

class Header extends React.Component {
  render() {
    const { image, playerName, playerScore } = this.props;
    return (
      <header className={ styles.headerGame }>
        <div className={ styles.imgGame }>
          <img
            src={ image }
            alt={ playerName }
            data-testid="header-profile-picture"
          />
        </div>
        <div className={ styles.playerGame }>
          <h1
            data-testid="header-player-name"
          >
            { playerName }
          </h1>
        </div>
        <h1
          data-testid="header-score"
          className={ styles.playerPoints }
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
  playerScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  image: state.user.image,
  playerName: state.user.name,
  playerScore: state.game.score,
});

export default connect(mapStateToProps)(Header);
