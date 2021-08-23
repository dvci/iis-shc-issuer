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
import BackButton from '../BackButton/BackButton';
import DownloadButton from '../DownloadButton/DownloadButton';
import FactList from '../FactList/FactList';
import HealthCard from '../HealthCard/HealthCard';

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
            mt={20}
            mb={20}
          >
            <HealthCard />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <DownloadButton>
              Download SMART&reg; Health Card
            </DownloadButton>
            <DownloadButton>
              Download Printable PDF
            </DownloadButton>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center" my={3}>
            <FactList />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Box display="flex" flexDirection="column" maxWidth="750px">
              <Typography variant="body2" component={"span"}>
                <p>
                  This vaccination record is powered by SMART&reg; and works with any app or service
                  where SMART&reg; Health Cards are accepted. For more information, please visit:
                  &nbsp;<Link 
                          color="secondary"
                          href="https://smarthealth.cards/"
                          target="_blank"
                          rel="noopener"
                        >
                            https://smarthealth.cards
                        </Link>.
                </p>
                <p>
                  The IAL number on this document describes the way that your identity information
                  was collected at the clinic. You can find more information about IAL encoding 
                  here: <Link 
                          color="secondary"
                          href="https://vci.org/ig/vaccination-and-testing"
                          target="_blank"
                          rel="noopener"
                        >
                            https://vci.org/ig/vaccination-and-testing
                        </Link>.
                </p>
                <p>
                  Your record can be verified or imported into the app of your choice by scanning
                  the QR code at the top of the page.
                </p>
              </Typography>
            </Box>
          </Box>
          
        </Route>

      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
