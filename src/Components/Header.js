import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGravatarURL } from '../data/helpers';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    return (
      <header>
        <img
          src={ getGravatarURL() }
          alt={ email }
          data-testid="header-profile-picture"
        />
        <h1
          data-testid="header-player-name"
        >
          { name }
        </h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
