import React from 'react';
import { Redirect } from 'react-router';
import logo from '../trivia.png';
import * as fetchAPI from '../helpers/fetchAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.config = this.config.bind(this);

    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  config() {
    fetchAPI.getToken();
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { name, email, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/config/" />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div>
            <input
              name="name"
              onChange={ this.handleChange }
              value={ name }
              type="text"
              placeholder="Nome"
              data-testid="input-player-name"
            />
            <input
              name="email"
              onChange={ this.handleChange }
              value={ email }
              type="email"
              placeholder="Email"
              data-testid="input-gravatar-email"
            />
          </div>
          <button
            onClick={ this.handleClick }
            type="button"
            data-testid="btn-play"
            disabled={ name.length === 0 || email.length === 0 }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.config() }
          >
            Configurações
          </button>
        </header>
      </div>
    );
  }
}

export default Login;
