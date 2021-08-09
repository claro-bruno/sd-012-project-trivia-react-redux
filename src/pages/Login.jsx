import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import Input from '../components/Input';
import fetchToken from '../APIs/fetchToken';
import '../CSS/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickConfig = this.handleClickConfig.bind(this);
  }

  componentDidMount() {
    this.saveToken();
  }

  validation() {
    const { email, name } = this.state;
    const emailVerify = /\S+@\S+\.\S+/;
    const nameFormat = 2;
    if (emailVerify.test(email) && name.length >= nameFormat) {
      return false;
    }
    return true;
  }

  async saveToken() {
    const data = await fetchToken();
    localStorage.setItem('token', data.token);
  }

  handleClickConfig() {
    const { history } = this.props;
    history.push('/settings');
  }

  handleClick(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push('/game');
    const { name, email } = this.state;
    localStorage.setItem('state',
      JSON.stringify({
        player: { name, assertions: 0, score: 0, gravatarEmail: email } }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, name } = this.state;
    return (
      <div className="text-center login">
        <div className="form-signin">
          <Input
            text="Nome"
            value={ name }
            onChange={ this.handleChange }
            dataTestId="player-name"
            id="name"
          />
          <Input
            text="Email"
            value={ email }
            onChange={ this.handleChange }
            dataTestId="gravatar-email"
            id="email"
          />
          <div>
            <button
              className="btn btn-lg btn-primary margin"
              type="button"
              data-testid="btn-play"
              disabled={ this.validation() }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
            <button
              className="btn btn-lg btn-primary margin"
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleClickConfig }
            >
              Config
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: objectOf(oneOfType([func, string, number, object])).isRequired,
};

export default Login;
