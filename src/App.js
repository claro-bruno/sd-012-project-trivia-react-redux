import React from 'react';
import { Route } from 'react-router-dom';
import Login from './component/Login';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={ <Login /> }
        />
        <Login />
      </div>
    );
  }
}

export default App;
