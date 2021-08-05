import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Game from './pages/Game';
import Config from './pages/Config';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/configs" render={ (props) => <Config { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    );
  }
}

export default App;
