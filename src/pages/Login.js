import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchToken, actionUserInfo } from '../redux/actions';
import SettingsButton from '../components/SettingsButton';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      disable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  getToken() {
    const { getDataFromApi, userInfo, userNameEmail } = this.props;
    const { name, email } = this.state;
    getDataFromApi();
    userNameEmail(name, email);
    localStorage.setItem('token', userInfo.token);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.validateLogin());
  }

  validateLogin() {
    const { email, name } = this.state;
    const checkEmail = /(.*)@(.*).com/;
    const nameLength = 5;
    const disable = !(checkEmail.test(email) && name.length > nameLength);
    this.setState({ disable });
  }

  render() {
    const { email, name, disable } = this.state;
    return (
      <div className="login-container">
        <h2>Trívia</h2>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              data-testid="input-player-name"
              id="input-player-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            E-mail:
            <input
              data-testid="input-gravatar-email"
              id="input-gravatar-email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              disabled={ disable }
              onClick={ () => this.getToken() }
            >
              Jogar
            </button>
          </Link>
          <SettingsButton />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDataFromApi: (data) => dispatch(fetchToken(data)),
  userNameEmail: (info) => dispatch(actionUserInfo(info)),
});

const mapStateToProps = (state) => ({
  userInfo: state.userReducer.info,
});

Login.propTypes = {
  getDataFromApi: PropTypes.func.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.object).isRequired,
  userNameEmail: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
