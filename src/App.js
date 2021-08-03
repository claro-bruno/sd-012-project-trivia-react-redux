import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/trivia" component={ Trivia } />
      </Switch>
      {/* <header className="App-header">
        {/* <img src={ logo } className="App-logo" alt="logo" /> }
      </header> */}
    </div>
  );
}
