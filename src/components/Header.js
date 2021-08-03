import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

function Header(props) {
  const { email, name } = props;
  return (
    <header>
      <img
        src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
        data-testid="header-profile-picture"
        alt={ `Name:${name}` }
      />
      <h2 data-testid="header-player-name">
        User:
        { name }
      </h2>
      <span data-testid="header-score">Placar:0</span>
    </header>
  );
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.userInfosReducer.user.email,
  name: state.userInfosReducer.user.name,
});

export default connect(mapStateToProps, null)(Header);
