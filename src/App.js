import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import Gametest from './pages/Gametest';
import Feedback from './pages/Feedback/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route path="/game" component={ Gametest } />
      <Route path="/settings" component={ Settings } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
