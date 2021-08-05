import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import FeedBack from './pages/FeedBack';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ FeedBack } />
    </Switch>
  );
}
