import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, hashEmail } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt={ `Foto do perfil de ${name}` }
        />
        <span
          data-testid="header-player-name"
        >
          { name }
        </span>
        <span
          data-testid="header-score"
        >
          {/* Aqui vai a pontuação do jogador no lugar do 0  */}
          0
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  // email: PropTypes.string,
  hashEmail: PropTypes.string,
};

Header.defaultProps = {
  name: 'Player',
  // email: 'email@example.com',
  hashEmail: '',
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  // email: state.login.email,
  hashEmail: state.login.hashEmail,
});

export default connect(mapStateToProps)(Header);
