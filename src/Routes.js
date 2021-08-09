import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './component/Login';
import Config from './component/Config';
import Quest from './component/Quest';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

function Routes() {
  return (
    <Switch>
      <Route path="/ranking" component={ Ranking } />
      <Route path="/quest" component={ Quest } />
      <Route path="/config" component={ Config } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
