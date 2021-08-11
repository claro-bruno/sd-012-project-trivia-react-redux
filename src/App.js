import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Game from './pages/game';
import Settings from './pages/settings';
import Feedback from './pages/feedback';
import Ranking from './pages/ranking';
import './pages/globalStyles/style.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/ranking" exact component={ Ranking } />
        <Route path="/settings" exact component={ Settings } />
        <Route path="/feedback" exact component={ Feedback } />
        <Route path="/game" exact component={ Game } />
        <Route path="/" exact component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}
