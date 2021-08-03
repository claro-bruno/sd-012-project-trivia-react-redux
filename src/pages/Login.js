import React, { PureComponent } from 'react';

class Login extends PureComponent {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabled: true,
    };

    this.handleInput = this.handleInput.bind(this);
  }

  componentDidUpdate() {
    this.handleButton();
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
      </div>
    );
  }
}

export default Login;
