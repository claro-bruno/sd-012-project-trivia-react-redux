import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import './App.css';
import Settings from './pages/Settings';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
      <div />
    </>
  );
}
