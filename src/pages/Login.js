import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      userName: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  /* https://stackoverflow.com/questions/201323
  /how-can-i-validate-an-email-address-using-a-regular-expression */
  render() {
    const { email, userName, disabled } = this.state;
    const validation = /^\S+@\S+\.\S+$/;
    const minLength = 6;
    const validateEmail = validation.test(email);
    return (
      <div className="container">
        <h2 className="login-text">Login</h2>
        <form className="login-form">
          <input
            name="userName"
            minLength="6"
            placeholder="nome de usuario"
            data-testid="input-player-name"
            type="userName"
            value={ userName }
            onChange={ this.handleChange }
          />
          <input
            name="email"
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
          />
          {validateEmail && userName.length >= minLength && disabled
            ? (
              <button data-testid="btn-play" type="submit">
                Jogar
              </button>
            ) : (
              <button data-testid="btn-play" disabled type="submit">
                Jogar
              </button>
            )}
        </form>
      </div>
    );
  }
}
