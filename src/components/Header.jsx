import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return (
      <header>
        <div className="img-container">
          <img
            className="avatar-img"
            data-testid="header-profile-picture"
            src={ hash }
            alt="avatar"
          />
        </div>
        <div className="header-text-container">
          <p className="player-name" data-testid="header-player-name">
            {name}
          </p>
          <p className="player-score" data-testid="header-score">
            { score }
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  score: state.login.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
