import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { addPlayerInfo } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      emailIsValid: false,
      nameIsValid: false,
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  emailChecker(value) {
    const emailRegex = new RegExp([
      '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9]',
      '(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])',
      '?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'].join(''));
    const emailIsValid = emailRegex.test(value);
    return emailIsValid;
  }

  nameChecker(value) {
    return (value !== '');
  }

  handleChange({ target }) {
    const { name, value } = target;
    const valid = (name === 'email') ? this.emailChecker(value) : this.nameChecker(value);
    this.setState({
      [name]: value,
      [`${name}IsValid`]: valid,
    });
  }

  async handleRedirect() {
    const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await fetchAPI.json();
    localStorage.setItem('token', token);
    this.setState({ shouldRedirect: true });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login } = this.props;
    const { name, email } = this.state;
    login({
      name,
      email,
    });
  }

  render() {
    const { email, name, emailIsValid, nameIsValid, shouldRedirect } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Nome"
          value={ name }
          onChange={ this.handleChange }
        />

        <input
          data-testid="input-gravatar-email"
          type="text"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />

        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !(emailIsValid && nameIsValid) }
          onClick={ this.handleRedirect }
        >
          Jogar
        </button>
        <Link to="/Settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Settings
          </button>
        </Link>
        { shouldRedirect && <Redirect to="/game" /> }
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (player) => dispatch(addPlayerInfo(player)),
});

export default connect(null, mapDispatchToProps)(Login);
