import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Trivia from './pages/Trivia';
import Login from './pages/Login';
import './App.css';
import Config from './pages/Config';

export default class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/config" component={ Config } />
          <Route path="/" />
        </Switch>
        <Switch>
          <Route path="/game/trivia" component={ Trivia } />
          <Route path="/game/feedback" />
          <Route path="/game/ranking" />
        </Switch>
      </>
    );
  }
}
