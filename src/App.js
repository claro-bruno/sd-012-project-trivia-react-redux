import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import NotFound from './pages/NotFound';
import Results from './pages/Results';
import Configs from './pages/Configs';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          path="/game"
          component={ Game }
        />
        <Route
          path="/results"
          component={ Results }
        />
        <Route
          path="/configs"
          component={ Configs }
        />
        <Route
          component={ NotFound }
        />
      </Switch>
    );
  }
}

export default App;
