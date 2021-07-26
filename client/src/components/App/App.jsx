import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header/Header';
import HeroBar from '../HeroBar/HeroBar';
import ThemeProvider from '../ThemeProvider';
import Form from '../Form/Form';
import illustration from '../../../images/vaccine-illustration.jpg';

const App = props => (
  <ThemeProvider>
    <CssBaseline />
    <Header />
    <HeroBar />
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
      <Box mt={11} mr={4} maxWidth="530px">
        <Form />
      </Box>
      <Box mt={2} ml={6}>
        <img src={illustration} alt="Woman receiving a vaccine" style={{width: '750px'}}/>
      </Box>
    </Box>

  </ThemeProvider>
);

export default App;
