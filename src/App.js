import React from 'react';
import { ThemeProvider } from 'styled-components';
import Routes from './Routes';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

export default function App() {
  return (
    <div>
      <ThemeProvider theme={ theme }>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </div>
  );
}
