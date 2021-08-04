import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Game from './components/Game';
import Ranking from './components/Ranking';
import Result from './components/Result';
import Login from './components/Login';
import Settings from './components/Settings';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/game" component={ Game } />
            <Route path="/ranking" component={ Ranking } />
            <Route path="/result" component={ Result } />
            <Route path="/settings" component={ Settings } />

          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
