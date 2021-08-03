import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/game"><Game /></Route>
        <Route exact path="/"><Login /></Route>
      </Switch>
    );
  }
}

export default Routes;
