import React, { Component } from 'react';
import { number } from 'prop-types';
import PlayerName from './PlayerName';
import Score from './Score';
import PlayerImg from './PlayerImg';
import Timer from './Timer';

class Header extends Component {
  render() {
    const { timer } = this.props;
    return (
      <div
        className="header-container"
      >
        <div
          className="timer-container"
        >
          <Timer timer={ timer } />
        </div>
        <div
          className="player-profile-container"
        >
          <PlayerName />
          <PlayerImg />
        </div>
        <div
          className="score-container"
        >
          <Score />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  timer: number.isRequired,
};

export default Header;
