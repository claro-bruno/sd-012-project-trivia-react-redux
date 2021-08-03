import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class HeaderPlayer extends Component {
  constructor() {
    super();
    this.state = {
      // token: '',
      score: 0,
    };
  }

  // changeToken() {
  //   const toke = localStorage.getItem('token');
  //   this.setState({ token: toke });
  // }

  render() {
    const { score } = this.state;
    const { userInfo } = this.props;
    const hash = md5(userInfo.email).toString();
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="vish, no pics" data-testid="header-profile-picture" />
        <p data-testid="header-score">{score}</p>
        <p data-testid="header-player-name">{ userInfo.name }</p>
      </header>
    );
  }
}

HeaderPlayer.propTypes = {
  userInfo: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(HeaderPlayer);
