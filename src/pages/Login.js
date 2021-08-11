import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLogin, fetchAvatar, resetAssertions } from '../redux/actions';
import getInfo from '../services/api';

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
    const { dispatchPlayer, avatarFetch, resetAssertionsAction } = this.props;
    const { name, gravatarEmail } = this.state;
    const login = await getInfo();
    await avatarFetch(gravatarEmail);

    dispatchPlayer(name, gravatarEmail);
    resetAssertionsAction();
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
  avatarFetch: (email) => dispatch(fetchAvatar(email)),
  resetAssertionsAction: () => dispatch(resetAssertions()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchPlayer: PropTypes.func.isRequired,
  avatarFetch: PropTypes.func.isRequired,
  resetAssertionsAction: PropTypes.func.isRequired,
};
