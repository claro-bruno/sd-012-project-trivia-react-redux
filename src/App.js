import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import LoginPage from './pages/loginPage';
import ConfigPage from './pages/configPage';
import GamePage from './pages/gamePage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route path="/settings" component={ ConfigPage } />
      <Route path="/questions" component={ GamePage } />
    </Switch>
  );
}
