import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Link } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header/Header';
import HeroBar from '../HeroBar/HeroBar';
import ThemeProvider from '../ThemeProvider';
import Form from '../Form/Form';
import illustration from '../../../images/vaccine-illustration.jpg';
import BackButton from '../BackButton/BackButton';

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
          <BackButton />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            mt={11}
            mb={11}
          >
            SMART HEALTH CARD WILL GO HERE
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box mr={2}>
              <Button disableElevation variant="contained">
                Download SMART&reg; Health Card
              </Button>
            </Box>
            <Box ml={2}>
              <Button disableElevation variant="contained">
                Download Printable PDF
              </Button>
            </Box>
          </Box>
          
        </Route>

      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
