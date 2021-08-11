import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Game from './Pages/Game';
import Config from './Pages/Config';
import Login from './Pages/Login';
import Ranking from './Pages/Ranking';
import Feedback from './Pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/game" render={ (props) => <Game { ...props } /> } />
        <Route path="/ranking" render={ (props) => <Ranking { ...props } /> } />
        <Route path="/configs" render={ (props) => <Config { ...props } /> } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/feedback" render={ (props) => <Feedback { ...props } /> } />
      </Switch>
    );
  }
}

export default App;
