import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Game from './Components/Game';
import NotFound from './Components/NotFound';
import Results from './Components/Results';
import Ranking from './Components/Ranking';
import Configs from './Components/Configs';
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
          path="/ranking"
          component={ Ranking }
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
