import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchToken } from '../redux/actions';
import logo from '../trivia.png';

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
    const { getDataFromApi, userInfo } = this.props;
    getDataFromApi();
    window.localStorage.setItem('token', userInfo.token);
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
    const { userInfo } = this.props;
    console.log(userInfo.token);
    return (
      <div>
        <header>
          <img src={ logo } alt="logo" />
        </header>
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
            Email:
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
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDataFromApi: (data) => dispatch(fetchToken(data)),
});

const mapStateToProps = (state) => ({
  userInfo: state.userReducer.info,
});

Login.propTypes = {
  getDataFromApi: PropTypes.func.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
