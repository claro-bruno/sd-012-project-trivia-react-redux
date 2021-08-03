import React from 'react';
import logo from '../trivia.png';
import * as fetchAPI from '../helpers/fetchAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
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
            onClick={ fetchAPI.getToken }
            type="button"
            data-testid="btn-play"
            disabled={ name.length === 0 || email.length === 0 }
          >
            Jogar
          </button>
        </header>
      </div>
    );
  }
}

export default Login;
