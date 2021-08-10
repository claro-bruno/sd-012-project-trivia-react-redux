import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import './App.css';
import Settings from './pages/Settings';
import GamePage from './pages/GamePage';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ GamePage } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
