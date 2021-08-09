import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './header.css';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          data-testid="header-profile-picture"
          alt={ `Name:${name}` }
        />
        <h2 data-testid="header-player-name">
          <span className="user">User:</span>
          { name }
        </h2>
        <span data-testid="header-score" className="score">
          <span className="score-text">Placar:</span>
          {score}
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.userInfosReducer.email,
  name: state.userInfosReducer.name,
});

export default connect(mapStateToProps, null)(Header);
