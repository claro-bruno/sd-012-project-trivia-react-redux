import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disableBtn: true,
      nameInput: '',
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.requestAPI = this.requestAPI.bind(this);
  }

  requestAPI() {
    const tokenApi = 'https://opentdb.com/api_token.php?command=request';
    fetch(tokenApi).then((data) => data.json())
      .then((response) => localStorage.setItem('token', response.token));
  }

  validateEmail(emailValue) {
    const reg = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    this.setState({
      disableBtn: (!reg.test(emailValue)),
    });
  }

  handleChange(target) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const minLengthName = 3;
    const { disableBtn, nameInput } = this.state;
    return (
      <section>
        <label htmlFor="name-input">
          Nome
          <input
            id="name-input"
            name="nameInput"
            data-testid="input-player-name"
            onChange={ ({ target }) => this.handleChange(target) }
          />
        </label>
        <label htmlFor="email-input">
          <input
            id="email-input"
            data-testid="input-gravatar-email"
            onChange={ ({ target }) => this.validateEmail(target.value) }
          />
        </label>
        <Link to="/jogo">
          <button
            type="button"
            data-testid="btn-play"
            variant="contained"
            color="primary"
            disabled={ disableBtn || nameInput.length < minLengthName }
            onClick={ this.requestAPI }
          >
            Jogar
          </button>
        </Link>
        <Link to="/configs">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </section>
    );
  }
}

export default Login;
