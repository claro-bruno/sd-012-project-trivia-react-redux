import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import trivia from '../trivia.png';
import { saveLogin } from '../redux/actions/actionsLogin';
import { fetchAPI, getTokenLoading } from '../redux/actions';
import ConfigButton from '../components/ConfigButton';

const md5 = require('md5');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: true,
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.btnDisable = this.btnDisable.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.btnDisable();
  }

  handleClick() {
    const { fetchAPItoken, token, saveData, Loading } = this.props;
    fetchAPItoken();
    localStorage.setItem('token', token);
    saveData(this.state);
    localStorage
      .setItem('state', JSON
        .stringify({ player: { name: '', assertions: 0, score: 0, gravatarEmail: '' } }));
    Loading();
  }

  btnDisable() {
    const { name, email } = this.state;
    const validator = name.length > 0 && email.length > 0;
    if (validator) {
      this.setState({
        btnDisable: false,
      });
    }
  }

  render() {
    const { name, email, btnDisable } = this.state;
    return (
      <div className="main-login">
        <section className="section-logo">
          <img className="img" src={ trivia } alt="trivia img" />
          É PENTA!!!!!
        </section>
        <section className="section-login">
          <fieldset className="fieldset-login">
            <label className="labelForm" htmlFor="input-player-name">
              Nome:
              <input
                value={ name }
                name="name"
                onChange={ this.handleChange }
                type="text"
                data-testid="input-player-name"
              />
            </label>
            <label className="labelForm" htmlFor="input-gravatar-email">
              Email:
              <input
                value={ email }
                name="email"
                onChange={ this.handleChange }
                type="text"
                data-testid="input-gravatar-email"
              />
            </label>
            <Link to="/game">
              <button
                disabled={ btnDisable }
                type="button"
                data-testid="btn-play"
                onClick={ () => this.handleClick() }
              >
                Jogar
              </button>
            </Link>
            <ConfigButton />
          </fieldset>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  fetchAPItoken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  saveData: PropTypes.func,
  Loading: PropTypes.func,
};

Login.defaultProps = {
  saveData: () => {},
  Loading: () => {},
};

const mapStateToProps = (state) => ({
  token: state.login.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPItoken: () => dispatch(fetchAPI()),
  saveData: (state) => {
    const hashEmail = md5(
      state.email.toLowerCase()
        .replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
    );
    return dispatch(saveLogin(state, hashEmail));
  },
  Loading: () => dispatch(getTokenLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
