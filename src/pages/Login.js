import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changePlayerInfo } from '../actions';
import * as api from '../services/api';
import logo from '../trivia.png';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisable: true,
      token: '',
      gravatar: '',
      startMusic: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.renderInitial = this.renderInitial.bind(this);
    this.renderEnd = this.renderEnd.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { email, name } = this.state;
    if (email !== prevState.email || name !== prevState.name) {
      this.verifyLogin();
    }
    sessionStorage.lastConfig = '';
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  }

  verifyLogin() {
    const { name, email } = this.state;
    const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    if (regex.test(email) && name.length > 0) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  validateLogin() {
    const {
      player: { assertions, score },
      changePlayerInfoHandler,
    } = this.props;
    const { name, email } = this.state;
    const gravatarEmail = api.getGravatar(email);
    api.fethApi();
    const state = { player: { name, assertions, score, gravatarEmail } };
    localStorage.setItem('state', JSON.stringify(state));
    changePlayerInfoHandler({ name, gravatarEmail });
  }

  renderInitial() {
    const { name, email } = this.state;
    return (
      <>
        <label htmlFor="input-text">
          <input
            value={ name }
            name="name"
            type="text"
            placeholder="Digite seu Nome"
            data-testid="input-player-name"
            className="input-text"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-email">
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu Email"
            className="input-email"
            onChange={ this.handleChange }
          />
        </label>
      </>
    );
  }

  renderEnd() {
    const { isDisable } = this.state;
    return (
      <div className="options-menu">
        <div className="jogar-container">
          <Link to="/game">
            <button
              className="btn-container btn-play"
              onClick={ this.validateLogin }
              disabled={ isDisable }
              type="submit"
              data-testid="btn-play"
            >
              Jogar
            </button>
          </Link>
        </div>
        <div className="jogar-container">
          <Link to="/settings">
            <button
              className="btn-container"
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>VALENDO 1 MILÃO DE REAIS !!!</p>
        <form className="login">
          {this.renderInitial()}
          {this.renderEnd()}
        </form>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  changePlayerInfoHandler: (playerInfo) => dispatch(changePlayerInfo(playerInfo)),
});

Login.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  changePlayerInfoHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
