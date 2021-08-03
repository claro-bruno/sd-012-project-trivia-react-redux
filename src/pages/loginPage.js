import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../trivia.png';

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
