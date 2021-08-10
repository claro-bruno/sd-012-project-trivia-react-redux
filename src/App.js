import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Result from './pages/Feedback';
import Login from './pages/Login';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/game" component={ Game } />
            <Route path="/ranking" component={ Ranking } />
            <Route path="/feedback" component={ Feedback } />
            <Route path="/settings" component={ Settings } />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
