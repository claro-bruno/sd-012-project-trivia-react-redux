import React from 'react';
import { Switch, Route } from 'react-router';
import { createGlobalStyle } from 'styled-components';

import LoginPage from './pages/LoginPage';
import ConfigPage from './pages/ConfigPage';
import GamePage from './pages/GamePage';
import FeedbackPage from './pages/FeedbackPage';
import RankingPage from './pages/RankingPage';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: hsl(219, 30%, 18%);
    color: hsl(0, 0%, 100%);
    font-family: 'Poppins', sans-serif;
    padding: 1rem;
  }

  h1, h2, h3 {
    font-weight: 600;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/settings" component={ ConfigPage } />
        <Route path="/questions" component={ GamePage } />
        <Route path="/feedback" component={ FeedbackPage } />
        <Route path="/ranking" component={ RankingPage } />
      </Switch>
    </>
  );
}
