import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userPlayer: { name, gravatarEmail } } = this.props;
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="Imagem Avatar"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">

          { score }
        </h2>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  userPlayer: state.user.userInfo,
  score: state.user.userInfo,
  requestGameApi: state.game.gameDataApi,
});
export default connect(mapStateToProps)(Header);
Header.propTypes = {
  userPlayer: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }),
}.isRequired;
