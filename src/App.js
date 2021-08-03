import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Ranking from './pages/ranking';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}

export default App;
