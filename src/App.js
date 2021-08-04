import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ GamePage } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </BrowserRouter>
  );
}
