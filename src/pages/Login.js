import React from 'react';
import { Redirect } from 'react-router-dom';
import UserInputs from '../components/UserInputs';
import GenericBtn from '../components/GenericBtn';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      disabled: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.validation = this.validation.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.checkLogin);
  }

  handleClick() {
    this.setState({
      redirect: true,
    });
  }

  validation() {
    const { username, email } = this.state;
    return username.length > 0 && email.length > 0;
  }

  checkLogin() {
    this.setState({
      disabled: !(this.validation()),
    });
  }

  render() {
    const { disabled, redirect } = this.state;

    const userInputProps = {
      id: 'input-player-name',
      name: 'username',
      innerHtml: 'Nome',
      type: 'text',
      onChange: this.handleChange,
    };

    const emailInputProps = {
      id: 'input-gravatar-email',
      name: 'email',
      innerHtml: 'Email',
      type: 'email',
      onChange: this.handleChange,
    };

    const loginBtnProps = {
      id: 'btn-play',
      value: 'Jogar',
      disabled,
      onClick: this.handleClick,
    };

    return (
      <div className="App">
        <header className="main-header">
          <h1 className="logo">BRAINTEST</h1>
        </header>
        <img src={ logo } className="App-logo" alt="logo" />
        <div>
          <UserInputs { ...userInputProps } />
          <UserInputs { ...emailInputProps } />
          <GenericBtn { ...loginBtnProps } />
          {redirect && <Redirect to="/game" />}
        </div>
      </div>
    );
  }
}

export default Login;
