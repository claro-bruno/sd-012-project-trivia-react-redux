import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { getUrl, getName } = this.props;
    return (
      <header>
        <img
          style={ { width: '90px' } }
          data-testid="header-profile-picture"
          src={ getUrl }
          alt="Profile"
        />
        <h4 data-testid="header-player-name">{getName}</h4>
        <h5 data-testid="header-score">0</h5>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  getUrl: state.gravatar.url,
  getName: state.gravatar.name,
});

Header.propTypes = {
  getUrl: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
