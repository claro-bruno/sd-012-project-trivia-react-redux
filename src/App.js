import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/"><Login /></Route>
        <Route path="/game"><Game /></Route>
      </Switch>
    );
  }
}

export default App;
