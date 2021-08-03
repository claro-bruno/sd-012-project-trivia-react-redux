import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends React.Component {
  render() {
    const { picture, nick } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ picture } alt="Foto do jogador" />
        <h2 data-testid="header-player-name">
          { nick }
        </h2>
        <h2 data-testeid="header-score">{ }</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
});

Game.propTypes = {
  picture: PropTypes.string.isRequired,
  nick: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
