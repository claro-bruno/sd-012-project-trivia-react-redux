import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.inputsValidation = this.inputsValidation.bind(this);
    this.handleGetEmail = this.handleGetEmail.bind(this);

    this.state = {
      name: false,
      email: false,
    };
  }

  componentWillUnmount() {
    this.handleGetEmail();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async tokenRequire() {
    const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await fetchAPI.json();
    const { token } = response;
    localStorage.setItem('token', JSON.stringify(token));
  }

  inputsValidation() {
    const { email, name } = this.state;
    const emailValidation = /(.*)@(.*).com/.test(email);
    const charactersName = name.length;
    const minimoName = 1;
    if (charactersName >= minimoName && emailValidation === true) {
      return false;
    }
    return true;
  }

  // manda pro estado do redux o nome e email do jogador
  handleGetEmail() {
    const { email, name } = this.state;
    const { getEmail } = this.props;
    getEmail(email, name);
  }

  render() {
    return (
      <div>
        <input
          name="name"
          type="text"
          data-testid="input-player-name"
          placeholder="Coloque seu nome aqui :)"
          onChange={ this.handleChange }
        />

        <input
          name="email"
          id="email"
          type="email"
          data-testid="input-gravatar-email"
          placeholder="E-mail aqui :)"
          onChange={ this.handleChange }
        />

        <Link to="/Trivia">
          <button
            disabled={ this.inputsValidation() }
            data-testid="btn-play"
            type="button"
            onClick={ this.tokenRequire }
          >
            JOGAR
          </button>
        </Link>

        <Link to="/settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            CONFIGURAÇÕES
          </button>
        </Link>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (emailInput, nameInput) => dispatch(loginAction(emailInput, nameInput)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getEmail: PropTypes.func,
}.isRequired;
