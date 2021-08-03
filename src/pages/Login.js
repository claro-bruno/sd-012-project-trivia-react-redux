import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      buttonDisabled: true,
    };

    this.validation = this.validation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validation() {
    const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const { name, email } = this.state;
    if (name.length > 0 && email.match(re)) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    }, () => this.validation());
  }

  render() {
    const { buttonDisabled, name, email } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
            id="name"
            type="text"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            id="email"
            type="email"
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ buttonDisabled }
        >
          Jogar!
        </button>
        <Link data-testid="btn-settings" to="/settings">Configurações</Link>
      </div>
    );
  }
}

export default Login;
