import React, { Component } from 'react';
import logo from '../trivia.png';
import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <main className="front-page">
          <img src={ logo } className="App-logo" alt="logo" />
          <LoginForm />
        </main>
      </div>
    );
  }
}

export default LoginPage;
