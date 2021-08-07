import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import login from './pages/login';
import settings from './pages/settings';
import play from './pages/play';
import feedback from './pages/feedback';
import ranking from './pages/ranking';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ login } />
        <Route exact path="/settings" component={ settings } />
        <Route exact path="/play" component={ play } />
        <Route exact path="/feedback" component={ feedback } />
        <Route exact path="/ranking" component={ ranking } />
      </Switch>
    </div>
  );
}
