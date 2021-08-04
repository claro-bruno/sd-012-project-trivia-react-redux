import React from 'react';
// import logo from './trivia.png';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Configs from './pages/Configs';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={ logo } className="App-logo" alt="logo" /> */}
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/configs" component={ Configs } />
        </Switch>
      </header>
    </div>
  );
}
