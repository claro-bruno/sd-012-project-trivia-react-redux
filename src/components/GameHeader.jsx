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
    const playerString = localStorage.getItem('player');
    const { name, email } = JSON.parse(playerString);
    this.fetchAvatar(email);
    return {
      name,
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
    const { name } = this.getPlayerFromLocalStorage();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="profilePhoto"
          src={ url }
        />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h4 data-testid="header-score">0</h4>
      </header>
    );
  }
}