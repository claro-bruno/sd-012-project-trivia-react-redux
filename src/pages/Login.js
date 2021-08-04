import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getInfo from '../services/api';
import { createLogin } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.getLogin = this.getLogin.bind(this);
  }

  async getLogin() {
    const { dispatchPlayer } = this.props;
    const { name, gravatarEmail } = this.state;
    const login = await getInfo();

    dispatchPlayer(name, gravatarEmail);
    return login;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  /* https://stackoverflow.com/questions/201323
  /how-can-i-validate-an-email-address-using-a-regular-expression */
  render() {
    const { gravatarEmail, name, disabled } = this.state;
    const validation = /^\S+@\S+\.\S+$/;
    const minLength = 6;
    const validateEmail = validation.test(gravatarEmail);
    return (
      <div className="container">
        <h2 className="login-text">Login</h2>
        <form className="login-form">
          <input
            name="name"
            minLength="6"
            placeholder="nome de usuario"
            data-testid="input-player-name"
            type="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            name="gravatarEmail"
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            type="email"
            value={ gravatarEmail }
            onChange={ this.handleChange }
          />
          <Link to="/game">
            {validateEmail && name.length >= minLength && disabled
              ? (
                <button
                  data-testid="btn-play"
                  type="button"
                  onClick={ () => this.getLogin() }
                >
                  Jogar
                </button>
              ) : (
                <button data-testid="btn-play" disabled type="button">
                  Jogar
                </button>
              )}
          </Link>
        </form>
        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Configurações</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchPlayer: (value, email) => dispatch(createLogin(value, email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchPlayer: PropTypes.func.isRequired,
};
