import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class HeaderGame extends React.Component {
  render() {
    const { name, email } = this.props;
    const hash = md5(email).toString();
    const img = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header>
        <img
          src={ img }
          alt={ email }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

HeaderGame.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(HeaderGame);
