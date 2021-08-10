import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { getUserData } from '../redux/actions';
import saveLocalStorage from '../helper/saveLocalStorage';
import getUserInfo from '../services/api';
import { pictureUpdate } from '../redux/actions/gameActions';

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

  getProfilePicture() {
    const { savePicture } = this.props;
    const { email } = this.state;
    const hash = md5(email).toString();
    const pictureUrl = `https://www.gravatar.com/avatar/${hash}`;
    savePicture(pictureUrl);
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    }, () => this.validation());
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

  async handleLogin() {
    const { name, email } = this.state;
    const userInfo = await getUserInfo();
    localStorage.setItem('token', userInfo.token);
    const { getUser, history } = this.props;
    getUser(name, email);
    this.getProfilePicture();
    saveLocalStorage();
    history.push('/game');
  }

  render() {
    const { buttonDisabled, name, email } = this.state;
    return (
      <div>
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
        <button
          data-testid="btn-play"
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.handleLogin }
        >
          Jogar!
        </button>
        <Link data-testid="btn-settings" to="/settings">Configurações</Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUser: (name, email) => dispatch(getUserData(name, email)),
  savePicture: (state) => dispatch(pictureUpdate(state)),
});

Login.propTypes = {
  getUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  savePicture: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
