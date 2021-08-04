import React from 'react';
import PropTypes from 'prop-types';
import ConfigButton from '../Components/ConfigButton'
// import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { nome, email } = this.state;
    const { history: { push } } = this.props;
    return (
      <div className="App">
        <header>
          {/* <header className="App-header"> */}
          {/* <img src={ logo } className="App-logo" alt="logo" /> */}
          <p>
            SUA VEZ
          </p>
        </header>
        <form>
          <label htmlFor="input-name">
            Insira seu nome
            <input
              type="text"
              name="nome"
              value={ nome }
              id="input-name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="input-email">
            Insira seu e-mail
            <input
              type="email"
              name="email"
              value={ email }
              id="input-email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            disabled={ !nome || !email }
            data-testid="btn-play"
          >
            Jogar
          </button>

        </form>
        <ConfigButton push={ push } />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.arrayOf(Object).isRequired,
  push: PropTypes.func.isRequired,
};

export default Login;
