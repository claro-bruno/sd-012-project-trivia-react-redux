import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Game from './Pages/Game';
import Config from './Pages/Config';
import Login from './Pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/game" render={ (props) => <Game { ...props } /> } />
        <Route path="/configs" render={ (props) => <Config { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    );
  }
}

export default App;
