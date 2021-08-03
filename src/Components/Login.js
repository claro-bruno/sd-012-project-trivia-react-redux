import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit() {
    return null;
  }

  render() {
    const { email, name } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label
          htmlFor="email"
        >
          email:
          <input
            id="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label
          htmlFor="name"
        >
          Name:
          <input
            id="name"
            type="text"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !(email && name) }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
