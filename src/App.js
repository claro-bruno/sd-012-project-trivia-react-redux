import React, { Component } from 'react';
import logo from './trivia.png';
import Login from './pages/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <Login />
        </header>
      </div>
    );
  }
}

export default App;
