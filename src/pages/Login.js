import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Login extends PureComponent {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };

    this.handleInput = this.handleInput.bind(this);
    this.settingsButton = this.settingsButton.bind(this);
  }

  componentDidUpdate() {
    this.handleButton();
  }

  settingsButton() {
    return (
      <div>
        <Link
          to="/settings"
        >
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }

  handleInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleButton() {
    const { email, name } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { email, name, disabled } = this.state;
    return (
      <div>
        <label
          htmlFor="email"
        >
          <input
            type="email"
            name="email"
            className=""
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleInput }
          />
        </label>

        <label
          htmlFor="name"
        >
          <input
            type="text"
            name="name"
            className=""
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleInput }
          />
        </label>

        <button
          data-testid="btn-play"
          type="button"
          disabled={ disabled }
        >
          Jogar
        </button>

        { this.settingsButton() }
      </div>
    );
  }
}

export default Login;
