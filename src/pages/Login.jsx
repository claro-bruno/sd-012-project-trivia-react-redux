import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin, fetchAPI } from '../redux/actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.checkToken = this.checkToken.bind(this);
    this.redirectSettingsBtn = this.redirectSettingsBtn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.checkLogin();
  }

  // Referencia de como validar email com regex em https://ui.dev/validate-email-address-javascript/
  emailValidation(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  checkName(name) {
    const nameLength = 2;
    return name.length >= nameLength;
  }

  // handleClick(event) {
  //   event.preventDefault();
  //   const { login, history } = this.props;
  //   const { email } = this.state;
  //   login(email);
  //   history.push('/game');
  // }

  redirectSettingsBtn(event) {
    event.preventDefault();
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/settings');
  }

  checkLogin() {
    const { email, name } = this.state;
    return (this.emailValidation(email)) && (this.checkName(name));
  }

  checkToken() {
    const { fetchToken, token } = this.props;
    fetchToken();
    localStorage.setItem('token', token);
  }

  render() {
    const { email, name } = this.state;

    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            placeholder="Digite seu email"
            required="true"
            minLength="6"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              required
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game">
            <button
              type="submit"
              data-testid="btn-play"
              onClick={ this.checkToken() }
              disabled={ !this.checkLogin() }
            >
              Jogar
            </button>
          </Link>
        </label>
        <button
          type="submit"
          data-testid="btn-settings"
          onClick={ this.redirectSettingsBtn }
        >
          Settings
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(userLogin(payload)),
  fetchToken: () => dispatch(fetchAPI),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  fetchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
