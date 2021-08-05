import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConfigButton from '../Components/ConfigButton';
import { fetchLoginAction } from '../redux/actions';
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
    const { history: { push }, sendAction } = this.props;
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
            data-testid="btn-play"
            disabled={ !nome || !email }
            onClick={ () => sendAction(nome, email) }
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
  history: PropTypes.arrayOf().isRequired,
  sendAction: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendAction: (nome, email) => dispatch(fetchLoginAction(nome, email)),
});

export default connect(null, mapDispatchToProps)(Login);
