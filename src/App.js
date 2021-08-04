import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Switch>
          <Route exact path="/" />
          <Route path="/config" />
          <Route path="/" />
        </Switch>
        <Route path="/game/trivia" />
        <Route path="/game/feedback" />
        <Route path="/game/ranking" />
      </Switch>
    );
  }
}
