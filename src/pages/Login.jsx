import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLogin, getToken } from '../redux/action/index';
import logo from '../trivia.png';

const regEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
const nameSize = 3;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handle = this.handle.bind(this);
    this.handleClickToken = this.handleClickToken.bind(this);
  }

  handle({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClickToken() {
    const { fetchToken, dataUser } = this.props;
    fetchToken();
    dataUser(this.state);
  }

  render() {
    const { email, name } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            placeholder="Name"
            value={ name }
            onChange={ this.handle }
          />
          <input
            data-testid="input-gravatar-email"
            name="email"
            type="email"
            placeholder="Email"
            value={ email }
            onChange={ this.handle }
          />
          <Link to="/game">
            <button
              disabled={ !(regEmail.test(email) && name.length > nameSize) }
              data-testid="btn-play"
              type="button"
              onClick={ this.handleClickToken }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dataUser: (userLogin) => dispatch(getLogin(userLogin)),
  fetchToken: () => dispatch(getToken()),
});

Login.propTypes = {
  dataUser: PropTypes.func.isRequired,
  callAPI: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
