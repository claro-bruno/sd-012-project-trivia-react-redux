import React from 'react';
import Login from './pages/Login';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
