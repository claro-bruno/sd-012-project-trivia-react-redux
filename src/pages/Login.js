import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: true,
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.btnDisable = this.btnDisable.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.btnDisable();
  }

  btnDisable() {
    const { name, email } = this.state;
    const validator = name.length > 0 && email.length > 0;
    if (validator) {
      this.setState({
        btnDisable: false,
      });
    }
  }

  render() {
    const { name, email, btnDisable } = this.state;
    return (
      <fieldset>
        <label
          htmlFor="input-player-name"
        >
          Nome:
          <input
            value={ name }
            name="name"
            onChange={ this.handleChange }
            type="text"
            data-testid="input-player-name"
          />
        </label>
        <label
          htmlFor="input-gravatar-email"
        >
          Email:
          <input
            value={ email }
            name="email"
            onChange={ this.handleChange }
            type="text"
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          disabled={ btnDisable }
          type="button"
          data-testid="btn-play"
        >
          Jogar
        </button>
      </fieldset>
    );
  }
}

export default Login;
