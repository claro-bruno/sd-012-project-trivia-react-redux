import React, { Component } from 'react';
import logo from '../../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handlerChange = this.handlerChange.bind(this);
  }

  handlerChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  isValid(name, email) {
    if (!name || !email) return true;
    return false;
  }

  render() {
    const { name, email } = this.state;
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
              disabled={ this.isValid(name, email) }
            >
              Jogar
            </button>
          </form>
        </main>
      </div>
    );
  }
}

export default Login;
