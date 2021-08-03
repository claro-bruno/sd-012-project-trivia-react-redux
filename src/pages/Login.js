import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  validateInput() {
    const { name, email } = this.state;
    const validateEmail = /(.*)@(.*).com/;

    if (validateEmail.test(email) && name.length !== 0) {
      this.setState({
        isDisable: false,
      });
      return true;
    }
  }

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div>
        <h1>Login Trivia</h1>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              value={ name }
              id="name"
              name="name"
              type="text"
              required
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="input-gravatar-email"
              value={ email }
              id="email"
              name="email"
              type="email"
              required
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game">
            <button
              disable={ isDisable }
              type="submit"
              data-testid="btn-play"
            >
              Jogar
            </button>

          </Link>
        </form>
      </div>

    );
  }
}

export default Login;
