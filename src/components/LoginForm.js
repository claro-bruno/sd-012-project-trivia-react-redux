import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserName, addEmail, addToken, timeReset } from '../redux/actions';

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
        <input
          type="email"
          placeholder="Email"
          name="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ name }
        />
        <Link to="/questions">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !this.handleLoginInfo() }
            onClick={ () => this.addInfoToStore() }
          >
            Play
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => resetTimer() }
          >
            Settings
          </button>
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