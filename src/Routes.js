import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/"><Login /></Route>
      </Switch>
    );
  }
}

export default Routes;
