import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import './App.css';
import Settings from './pages/Settings';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (
            <div className="App">
              <header className="App-header">
                <img src={ logo } className="App-logo" alt="logo" />
                <p>
                  SUA VEZ
                </p>
                <Login />
              </header>
            </div>
          ) }
        />
        <Route
          path="/trivia"
          component={ Trivia }
        />
        <Route
          path="/settings"
          component={ Settings }
        />
      </Switch>
    );
  }
}

export default App;
