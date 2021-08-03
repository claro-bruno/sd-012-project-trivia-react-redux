import React from 'react';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      disable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.validateLogin());
  }

  validateLogin() {
    const { email, name } = this.state;
    const checkEmail = /(.*)@(.*).com/;
    const nameLength = 5;
    const disable = !(checkEmail.test(email) && name.length > nameLength);
    this.setState({ disable });
  }

  render() {
    const { email, name, disable } = this.state;
    return (
      <div>
        <header>
          <img src={ logo } alt="logo" />
        </header>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              data-testid="input-player-name"
              id="input-player-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              data-testid="input-gravatar-email"
              id="input-gravatar-email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disable }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
