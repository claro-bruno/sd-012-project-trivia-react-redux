import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Game from '../pages/Game';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/game" component={ Game } />
      </Switch>
    );
  }
}

export default Routes;
