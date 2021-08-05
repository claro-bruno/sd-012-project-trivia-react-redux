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
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/configs" render={ (props) => <Config { ...props } /> } />
      </Switch>
    );
  }
}

export default App;
