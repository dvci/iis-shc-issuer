import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header/Header';
import HeroBar from '../HeroBar/HeroBar';
import ThemeProvider from '../ThemeProvider';
import Form from '../Form/Form';
import illustration from '../../../images/vaccine-illustration.jpg';
import ResultsDisplay from '../ResultsDisplay/ResultsDisplay';

const App = props => (
  <ThemeProvider>
    <CssBaseline />
    <Header />

    <Router>    
      <HeroBar />

      <Switch>
        <Route exact path="/">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
          >
            <Box mt={11} mr={4} maxWidth="530px">
              <Form />
            </Box>
            <Box mt={2} ml={6} display="flex" flexDirection="column" alignItems="center">
              <img src={illustration} alt="Woman receiving a vaccine" style={{maxWidth: '750px'}}/>
              <Link
                href="https://www.vecteezy.com/free-vector/epidemic-prevention"
                color="secondary"
                target="_blank"
                rel="noopener"
              >
                Epidemic Prevention Vectors by Vecteezy
              </Link>
            </Box>
          </Box>
        </Route>

        <Route exact path="/data-found">    
          <ResultsDisplay />
        </Route>

      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
