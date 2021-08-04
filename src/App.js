import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Trivia from './pages/Trivia';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" />
          <Route path="/config" />
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
