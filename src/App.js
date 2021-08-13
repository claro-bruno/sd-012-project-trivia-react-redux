import React from 'react';
import { Switch, Route } from 'react-router';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/game" component={ Game } />
            <Route patch="/settings" component={ Settings } />
          </Switch>
        </p>
      </header>
    </div>
  );
}
