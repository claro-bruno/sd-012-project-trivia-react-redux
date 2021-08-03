import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './component/Login';
import Config from './component/Config';

function Routes() {
  return (
    <Switch>
      <Route exact path="/"><Login /></Route>
      <Route><Config /></Route>
    </Switch>
  );
}

export default Routes;
