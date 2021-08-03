import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import logo from '../../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      redirect: false,
      redirectConfig: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleRedirectConfig = this.handleRedirectConfig.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleRedirectConfig() {
    this.setState({ redirectConfig: true });
  }

  isValid(name, email) {
    if (!name || !email) return true;
    return false;
  }

  async handleRedirect() {
    const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await fetchAPI.json();
    localStorage.setItem('token', token);
    this.setState({ redirect: true });
  }

  render() {
    const { name, email, redirect, redirectConfig } = this.state;
    return (
      <div className="App">
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <main>
          <form>
            <input
              type="text"
              placeholder="nome"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
            <input
              type="text"
              placeholder="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleRedirect }
              disabled={ this.isValid(name, email) }
            >
              Jogar
            </button>
            { redirect && <Redirect to="/game" /> }
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleRedirectConfig }
            >
              Configurar
            </button>
            { redirectConfig && <Redirect to="/config" /> }
          </form>
        </main>
      </div>
    );
  }
}

export default Login;
