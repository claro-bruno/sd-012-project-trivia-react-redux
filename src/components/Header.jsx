import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, hashEmail, score } = this.props;
    return (
      <header className="header">
        <section className="centered-block">
          <img
            className="player-img"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt={ `Foto do perfil de ${name}` }
          />
          <span
            className="player-name"
            data-testid="header-player-name"
          >
            { name }
          </span>
          <span
            className="player-score"
            data-testid="header-score"
          >
            {/* Aqui vai a pontuação do jogador no lugar do 0  */}
            0
          </span>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  hashEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

Header.defaultProps = {
  name: 'Player',
  hashEmail: '',
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  hashEmail: state.login.hashEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
