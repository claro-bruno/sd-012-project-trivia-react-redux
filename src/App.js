import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
// import Game from './pages/Game';
import Settings from './pages/Settings';
import Gametest from './pages/Gametest';

export default function App() {
  return (
    <Switch>
      <Route exact path="/game" component={ Gametest } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
