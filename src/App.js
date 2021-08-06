import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import Score from './pages/Score';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          component={ () => <Login /> }
        />
        <Route
          exact
          path="/game"
          component={ () => <Game /> }
        />
        <Route
          exact
          path="/settings"
          component={ () => <Config /> }
        />
        <Route
          exact
          path="/score"
          component={ () => <Score /> }
        />
      </Switch>
    </div>
  );
}
