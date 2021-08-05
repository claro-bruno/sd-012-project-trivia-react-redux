import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}
