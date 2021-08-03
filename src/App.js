import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import GameQuestions from './components/GameQuestions';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/"><GameQuestions /></Route>
      </Switch>
    );
  }
}

export default App;
