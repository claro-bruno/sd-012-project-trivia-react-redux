import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLogin, getAPI } from '../redux/action/index';
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
    this.func = this.func.bind(this);
  }

  handle({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  func() {
    const { dataUser, callAPI } = this.props;
    dataUser(this.state);
    callAPI();
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
              onClick={ this.func }
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
  dataUser: (value) => dispatch(getLogin(value)),
  callAPI: () => dispatch(getAPI()),
});

Login.propTypes = {
  dataUser: PropTypes.func.isRequired,
  callAPI: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
