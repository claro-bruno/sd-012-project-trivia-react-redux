import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserData } from '../redux/actions';
// import saveLocalStorage from '../helper/saveLocalStorage';
import getUserInfo from '../services/api';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      buttonDisabled: true,
    };

    this.validation = this.validation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  validation() {
    const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const { name, email } = this.state;
    if (name.length > 0 && email.match(re)) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    }, () => this.validation());
  }

  async handleLogin() {
    const { name, email } = this.state;
    const { score, assertions, gravatarEmail } = this.props;
    const userInfo = await getUserInfo();
    localStorage.setItem('token', userInfo.token);
    const { getUser, history } = this.props;
    getUser(name, email);
    const obj = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(obj));
    // saveLocalStorage();
    history.push('/game');
  }

  render() {
    const { buttonDisabled, name, email } = this.state;
    return (
      <div className="login-content">
        <div className="settings-login">
          <Link
            className="settings-btn"
            data-testid="btn-settings"
            to="/settings"
          >
            <i className="bi bi-gear-fill" />
            {' Configurações'}
          </Link>
        </div>
        <h1 className="logo-trivia">Trivia</h1>
        <section className="login-field">
          <fieldset>
            <label htmlFor="name">
              Nome:
              <input
                value={ name }
                onChange={ this.handleChange }
                data-testid="input-player-name"
                id="name"
                type="text"
              />
            </label>
            <label htmlFor="email">
              E-mail:
              <input
                value={ email }
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                id="email"
                type="email"
              />
            </label>
          </fieldset>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.handleLogin }
          >
            Jogar!
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (name, email) => dispatch(getUserData(name, email)),
});

Login.propTypes = {
  getUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
