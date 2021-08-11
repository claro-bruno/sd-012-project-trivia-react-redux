import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addUserName, addEmail, addToken, timeReset } from '../redux/actions';

const Play = styled.button`
  display: block;
  width: 100%;
  border: none;
  background: linear-gradient(to right, hsl(198, 60%, 50%), hsl(176, 68%, 64%));
  color: hsl(0, 0%, 100%);
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 2.5rem;
  margin-top: 3rem;

  &:disabled {
    filter: opacity(0.8);
  }

  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 1em 0.5rem;
  border-bottom: 1px solid hsla(0, 0%, 100%, 62.5%);
  color: hsl(0, 0%, 100%);
  border-radius: 0.125rem;

  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-text-fill-color: hsl(0, 0%, 100%);
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: hsla(0, 0%, 100%, 62.5%);
  }
`;

const Settings = styled.button`
  background-color: transparent;
  border: none;
  color: hsla(0, 0%, 100%, 62.5%);
  margin-left: auto;
  display: block;
  margin-top: 0.625rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginInfo = this.handleLoginInfo.bind(this);
    this.handleTokenThing = this.handleTokenThing.bind(this);
    this.addInfoToStore = this.addInfoToStore.bind(this);
  }

  handleLoginInfo() {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
    const { email, name } = this.state;
    return (regexEmail.test(email) && name !== '');
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  async handleTokenThing() {
    const { setToken } = this.props;

    const url = 'https://opentdb.com/api_token.php?command=request';
    const res = await fetch(url);
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem('token', data.token);
  }

  addInfoToStore() {
    const { setEmailStore, setNameStore } = this.props;
    const { email, name } = this.state;
    setEmailStore(email);
    setNameStore(name);
    this.handleTokenThing();
    const player = {
      player: {
        name,
        gravatarEmail: email,
        score: 0,
        assertions: 0,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    const { email, name } = this.state;
    const { resetTimer } = this.props;
    return (
      <form>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
        />
        <Input
          type="text"
          placeholder="Name"
          name="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ name }
        />
        <Link to="/questions">
          <Play
            type="button"
            data-testid="btn-play"
            disabled={ !this.handleLoginInfo() }
            onClick={ () => this.addInfoToStore() }
          >
            Play
          </Play>
        </Link>
        <Link to="/settings">
          <Settings
            type="button"
            data-testid="btn-settings"
            onClick={ () => resetTimer() }
          >
            Settings
          </Settings>
        </Link>
      </form>
    );
  }
}

LoginForm.propTypes = {
  setEmailStore: PropTypes.func.isRequired,
  setNameStore: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmailStore: (email) => dispatch(addEmail(email)),
  setNameStore: (name) => dispatch(addUserName(name)),
  setToken: (token) => dispatch(addToken(token)),
  resetTimer: () => dispatch(timeReset()),
});

export default connect(null, mapDispatchToProps)(LoginForm);
