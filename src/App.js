import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    // <div>
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={ logo } className="App-logo" alt="logo" />
    //     </header>
    //   </div>
    <>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
      <div />
    </>
  );
}
