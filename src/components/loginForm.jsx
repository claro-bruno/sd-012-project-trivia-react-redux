import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginInfo = this.handleLoginInfo.bind(this);
    this.handleTokenThing = this.handleTokenThing.bind(this);
  }

  handleLoginInfo() {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
    const { email, name } = this.state;
    return (regexEmail.test(email) && name !== '');
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  handleTokenThing() {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => localStorage.setItem('token', data.token));
  }

  render() {
    const { email, name } = this.state;
    return (
      <form>
        <input
          type="email"
          placeholder="Email"
          name="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ name }
        />
        <Link to="/questions">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !this.handleLoginInfo() }
            onClick={ () => this.handleTokenThing() }
          >
            Play
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </Link>
      </form>
    );
  }
}

export default LoginForm;
