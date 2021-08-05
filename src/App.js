import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import LoginPage from './pages/LoginPage';
import ConfigPage from './pages/ConfigPage';
import GamePage from './pages/GamePage';
import FeedbackPage from './pages/FeedbackPage';
import RankingPage from './pages/RankingPage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route path="/settings" component={ ConfigPage } />
      <Route path="/questions" component={ GamePage } />
      <Route path="/feedback" component={ FeedbackPage } />
      <Route path="/ranking" component={ RankingPage } />
    </Switch>
  );
}
