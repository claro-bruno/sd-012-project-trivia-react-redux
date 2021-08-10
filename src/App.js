import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import NotFound from './pages/NotFound';
import Feedback from './pages/Feedback';
import Configs from './pages/Configs';
import Ranking from './Components/Ranking';
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
          path="/feedback"
          component={ Feedback }
        />
        <Route
          path="/configs"
          component={ Configs }
        />
        <Route
          exact
          path="/ranking"
          component={ Ranking }
        />
        <Route
          component={ NotFound }
        />
      </Switch>
    );
  }
}

export default App;
