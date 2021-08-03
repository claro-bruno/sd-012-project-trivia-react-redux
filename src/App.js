import React from 'react';
import { Route, Switch } from 'react-router';
import logo from './trivia.png';
import HomePage from './pages/HomePage';
import './App.css';

export default function App() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
      </div>
      <Switch>
        <Route exact path="/" component={ HomePage } />
      </Switch>
    </div>
  );
}
