import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

// instalamos a extensão abaixo para usar no Gravatar
// npm install crypto-js

class Header extends React.Component {
  render() {
    const { name, gravatarEmail } = this.props;
    const email = md5(gravatarEmail).toString();
    const urlGravatar = `https://www.gravatar.com/avatar/${email}`;
    return (
      <header>
        <div>
          <img data-testid="header-profile-picture" src={ urlGravatar } alt="Imagem do gamer" />
          <p data-testid="header-player-name">
            { name }
          </p>
          <span data-testid="header-score">
            Placar: 0
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
