import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLogin } from '../redux/action/index';
import getToken from '../Services/getToken';
import logo from '../trivia.png';

const regEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
const nameSize = 3;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      redirect: false,
    };
    this.handle = this.handle.bind(this);
    this.handleClickToken = this.handleClickToken.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handle({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async redirect() {
    const token = await getToken();
    localStorage.setItem('token', token);
  }

  handleClickToken() {
    const { dataUser, history } = this.props;
    dataUser(this.state);
    this.redirect();
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    const inputNameProps = {
      'data-testid': 'input-player-name',
      type: 'text',
      name: 'name',
      placeholder: 'Name',
      value: name,
      onChange: this.handle,
    };
    const inputEmailProps = {
      'data-testid': 'input-gravatar-email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      value: email,
      onChange: this.handle,
    };
    const buttonJogar = {
      disabled: !(regEmail.test(email) && name.length > nameSize),
      'data-testid': 'btn-play',
      onClick: this.handleClickToken,
    };
    const buttonSettings = {
      'data-testid': 'btn-settings',
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <input { ...inputNameProps } />
          <input { ...inputEmailProps } />
          <button type="button" { ...buttonJogar }>Jogar</button>
          <Link to="/settings">
            <button type="button" { ...buttonSettings }>Configurações</button>
          </Link>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dataUser: (userLogin) => dispatch(getLogin(userLogin)),
});

Login.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataUser: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  getQuest: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
