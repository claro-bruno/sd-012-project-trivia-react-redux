import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import './App.css';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/ranking" component={ Ranking } />
        <Route path="/feedback" component={ Feedback } />
        <Route exact path="/" component={ Login } />
        <Route path="/quiz" component={ Quiz } />
      </Switch>
    );
  }
}

export default App;
