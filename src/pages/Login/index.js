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
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handlerChange({ target: { name, value } }) {
    this.setState({ [name]: value });
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
    const { name, email, redirect } = this.state;
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
              onChange={ this.handlerChange }
              data-testid="input-player-name"
            />

            <input
              type="text"
              placeholder="email"
              name="email"
              value={ email }
              onChange={ this.handlerChange }
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
          </form>
        </main>
      </div>
    );
  }
}

export default Login;
