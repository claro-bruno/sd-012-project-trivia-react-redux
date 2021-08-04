import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
// import Settings from './pages/Settings';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/Settings" component={ Settings } />
      </Switch>
    );
  }
}
