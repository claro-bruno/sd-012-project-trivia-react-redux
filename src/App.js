import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Configs from './pages/Configs';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={ logo } className="App-logo" alt="logo" /> */}
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/configs" component={ Configs } />
          <Route exact path="/jogo" component={ Game } />
          <Route exact path="/feedback" component={ Feedback } />
        </Switch>
      </header>
    </div>
  );
}
