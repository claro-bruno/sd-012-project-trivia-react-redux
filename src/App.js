import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import GameScreen from './pages/GameScreen';
// import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import FeedBack from './pages/FeedBack';
import './App.css';

export default function App() {
  return (
    <div className="body">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ GameScreen } />
        {/* <Route exact path="/ranking" component={ Ranking } /> */}
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ FeedBack } />
      </Switch>
    </div>
  );
}
