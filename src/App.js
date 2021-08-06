import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Config';
import Play from './pages/Play';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/config" component={ Config } />
        <Route exact path="/play" component={ Play } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
