import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
// import Game from './pages/Game';
import Settings from './pages/Settings';
import Gametest from './pages/Gametest';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Gametest } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}
