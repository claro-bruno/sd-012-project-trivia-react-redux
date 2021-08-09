import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './header.module.css';

class Header extends React.Component {
  render() {
    const { image, playerName, playerScore } = this.props;
    return (
      <header>
        <div className={ styles.headerImg }>
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
        </div>
        <div className={ styles.headerPonts }>
          <h1
            data-testid="header-score"
          >
            Pontos:
            { playerScore }
          </h1>
        </div>
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
