import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { actionCreateLogin, resetState } from '../redux/actions';
import { fetchApi } from '../services/api';
import HeaderInLogin from '../components/HeaderInLogin';
import '../Style/login.css';
import '../Style/headerInLogin.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: true,
      email: '',
      name: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.btnDisable = this.btnDisable.bind(this);
    this.handlePlayBtn = this.handlePlayBtn.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.btnDisable();
    });
  }

  async handlePlayBtn(state) {
    // utilizacao do LocalStorage talvez?
    const { email, name } = this.state;
    const url = 'https://opentdb.com/api_token.php?command=request';
    const DATA = await fetchApi(url);
    const TOKEN = DATA.token;
    localStorage.setItem('token', JSON.stringify(TOKEN));
    const { createLogin, resetUser } = this.props;
    resetUser();
    createLogin(state);
    this.setState({ redirect: true });
    localStorage.setItem('state', JSON.stringify({ player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
    }));
  }

  btnDisable() {
    const { name, email } = this.state;
    const validator = name !== '' && email !== '';
    this.setState({ btnDisable: !validator });
  }

  render() {
    const { name, email, btnDisable, redirect } = this.state;
    return (
      <>
        <div className="logo"><HeaderInLogin /></div>
        <fieldset className="login-screen">
          { redirect && <Redirect to="/game/trivia" /> }
          <label htmlFor="input-player-name">
            Nome:
            <input
              className="input-name"
              value={ name }
              name="name"
              onChange={ this.handleChange }
              type="text"
              data-testid="input-player-name"
            />
          </label>
          <label
            htmlFor="input-gravatar-email"
          >
            E-mail:
            <input
              className="input-email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
              type="text"
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            className="btn-play"
            type="button"
            data-testid="btn-play"
            disabled={ btnDisable }
            onClick={ () => this.handlePlayBtn(this.state) }
          >
            Jogar
          </button>
          <div>
            <Link to="/config" data-testid="btn-settings">
              <button className="btn-config" type="button">Configurações</button>
            </Link>
          </div>
        </fieldset>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createLogin: (state) => dispatch(actionCreateLogin(state)),
  resetUser: () => dispatch(resetState()),
});

Login.propTypes = {
  createLogin: PropTypes.func.isRequired,
  resetUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
