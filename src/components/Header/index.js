import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, avatar, score } = this.props;
    return (
      <header className="main-header">
        <h1 className="logo">BRAINTEST</h1>
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <p data-testid="header-score">{`Pontuação: ${score}`}</p>
        <img data-testid="header-profile-picture" src={ avatar } alt="gravatar" />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.userReducer.avatar,
  name: state.userReducer.name,
  score: state.gameReducer.currentScore,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
