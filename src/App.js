import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Trivia from './pages/Trivia';
import Login from './pages/Login';
import './App.css';
import HeaderInGame from './components/HeaderInGame';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/config" component={ Config } />
          <Route path="/game/ranking" component={ Ranking } />
          <Route path="/" component={ HeaderInGame } />
        </Switch>
        <Switch>
          <Route path="/game/trivia" component={ Trivia } />
          <Route path="/game/feedback" component={ Feedback } />
        </Switch>
      </>
    );
  }
}
