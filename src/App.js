import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Quiz from './pages/Quiz';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/ranking" component={ Ranking } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/quiz" component={ Quiz } />
        <Route path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
