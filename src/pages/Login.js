import React from 'react';
import logo from '../trivia.png';

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
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <main>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              id="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button type="button" data-testid="btn-play">Jogar</button>
        </form>
      </main>
    );
  }
}

export default Login;
