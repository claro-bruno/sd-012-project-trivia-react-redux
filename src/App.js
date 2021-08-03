import React, { Component } from 'react';
// import logo from './trivia.png';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';

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
