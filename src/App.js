import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Config from './Pages/Config';
import Login from './Pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/configs" render={ (props) => <Config { ...props } /> } />
      </Switch>
    );
  }
}

export default App;
