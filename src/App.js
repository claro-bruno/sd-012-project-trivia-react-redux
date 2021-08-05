import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import './App.css';
import Settings from './pages/Settings';
import GamePage from './pages/GamePage';
import TriviaQuestions from './pages/TriviaQuestions';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ GamePage } />
      </Switch>
      <TriviaQuestions />
      <div />
    </>
  );
}
