import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import LoginPage from './pages/loginPage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginPage } />
    </Switch>
  );
}
