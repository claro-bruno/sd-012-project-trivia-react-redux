import React, { Component } from 'react';
import logo from '../trivia.png';
import Input from '../components/Input';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ!
            <Input id="name" name="name" type="text" />
          </p>
        </header>
      </div>
    );
  }
}

export default Login;
