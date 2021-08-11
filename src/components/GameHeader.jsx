import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

export default class HeaderGame extends Component {
  constructor() {
    super();

    this.state = {
      url: '',
    };

    this.getPlayerFromLocalStorage = this.getPlayerFromLocalStorage.bind(this);
    this.fetchAvatar = this.fetchAvatar.bind(this);
  }

  componentDidMount() {
    this.getPlayerFromLocalStorage();
  }

  getPlayerFromLocalStorage() {
    const playerString = localStorage.getItem('state');
    const { name, gravatarEmail, score } = JSON.parse(playerString).player;
    this.fetchAvatar(gravatarEmail);
    return {
      name,
      score,
    };
  }

  async fetchAvatar(email) {
    const avatar = md5(email).toString();
    const fetchA = await fetch(`https://www.gravatar.com/avatar/${avatar}`);
    const url = await fetchA.url;
    this.setState({ url });
  }

  render() {
    const { url } = this.state;
    const { name, score } = this.getPlayerFromLocalStorage();
    return (
      <header className="d-flex justify-content-between">
        <img
          data-testid="header-profile-picture"
          alt="profilePhoto"
          src={ url }
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <div className="score">
          <h4 data-testid="header-score">{ score }</h4>
        </div>
      </header>
    );
  }
}
