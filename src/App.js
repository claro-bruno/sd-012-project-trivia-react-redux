import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Route exact path="/" component={ Login } />
          <Route path="/config" />
        </BrowserRouter>
        <BrowserRouter>
          <Route path="/game/trivia" />
          <Route path="/game/feedback" />
          <Route path="/game/ranking" />
        </BrowserRouter>
      </>
    );
  }
}
