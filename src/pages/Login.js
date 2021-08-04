import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetGravatarImg } from '../redux/action';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disableBtn: true,
      nameInput: '',
      email: '',
      redirect: false,
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchGravatar = this.fetchGravatar.bind(this);
    this.requestAPI = this.requestAPI.bind(this);
  }

  async requestAPI() {
    const endPoint = 'https://opentdb.com/api_token.php?command=request';
    let result = await fetch(endPoint);
    result = await result.json();
    localStorage.setItem('token', JSON.stringify(result.token));
    this.setState({
      redirect: true,
    });
  }

  validateEmail(emailValue) {
    const reg = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    this.setState({
      disableBtn: (!reg.test(emailValue)),
    });
  }

  handleChange(target) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    if (target.name === 'email') {
      this.validateEmail(target.value);
    }
  }

  async fetchGravatar() {
    const { email, nameInput } = this.state;
    const { setPlayerInfo } = this.props;
    const toHash = md5(email).toString();
    const result = await fetch(`https://www.gravatar.com/avatar/${toHash}`);
    setPlayerInfo(result.url, nameInput);
    this.requestAPI();
  }

  render() {
    const minLengthName = 3;
    const { disableBtn, nameInput, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/jogo" />;
    }
    return (
      <section>
        <TextField
          id="name-helperText"
          label="Nome"
          variant="outlined"
          name="nameInput"
          onChange={ ({ target }) => this.handleChange(target) }
          inputProps={ { 'data-testid': 'input-player-name' } }
        />
        <TextField
          id="email-helperText"
          label="Email"
          type="email"
          helperText="Digite seu email do gravatar"
          variant="outlined"
          name="email"
          onChange={ ({ target }) => this.handleChange(target) }
          inputProps={ { 'data-testid': 'input-gravatar-email' } }
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ () => this.fetchGravatar() }
          disabled={ disableBtn || nameInput.length < minLengthName }
        >
          Jogar
        </button>
        <Link to="/configs">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPlayerInfo: (url, name) => dispatch(actionGetGravatarImg(url, name)),
});

Login.propTypes = {
  setPlayerInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
