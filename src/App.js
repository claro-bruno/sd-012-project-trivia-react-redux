import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import './App.css';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/feedback" component={ Feedback } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
