import React from 'react';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
      nameCheck: false,
      email: '',
      emailCheck: false,
    };
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
    // valida email e name
    const emailFormat = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    if (id === 'email') {
      if (emailFormat.test(value)) {
        this.setState({
          emailCheck: true,
        });
      } else {
        this.setState({
          emailCheck: false,
        });
      }
    }
    if (id === 'name') {
      if (value !== '') {
        this.setState({
          nameCheck: true,
        });
      } else {
        this.setState({
          nameCheck: false,
        });
      }
    }
  }

  render() {
    const { name, email, emailCheck, nameCheck } = this.state;
    const btnCheck = !(emailCheck === true && nameCheck === true);
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
          <button
            type="button"
            data-testid="btn-play"
            disabled={ btnCheck }
          >
            Jogar
          </button>
        </form>
      </main>
    );
  }
}

export default Login;
