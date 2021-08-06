import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/ranking"><Ranking /></Route>
        <Route path="/game"><Game /></Route>
        <Route path="/config"><Settings /></Route>
        <Route path="/feedback"><Feedback /></Route>
        <Route exact path="/"><Login /></Route>
      </Switch>
    );
  }
}

export default Routes;
