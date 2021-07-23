import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header/Header';
import HeroBar from '../HeroBar/HeroBar';
import ThemeProvider from '../ThemeProvider';

const App = props => (
  <ThemeProvider>
    <CssBaseline />
    <Header />
    <HeroBar />

  </ThemeProvider>
);

export default App;
