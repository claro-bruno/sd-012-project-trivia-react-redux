import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Quiz from './pages/Quiz';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route path="/quiz" component={ Quiz } />
      </Switch>
    );
  }
}

export default App;
