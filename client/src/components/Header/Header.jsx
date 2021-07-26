import React from 'react';
import useStyles from './styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
import logo from '../../../images/mitre-logo.svg';

const Header = () => {
  const styles = useStyles();
  return (
    <header className={styles.header}>
      <Container maxWidth={false}>
        <Box display="flex" alignItems="center">
          <img src={logo} alt="Placeholder Mitre logo" style={{width: '100px'}}/>
          <Box ml={2}>
            <Typography variant="h6" component="h1">
              ISS SMART Health Card Issuer
            </Typography>
          </Box>
        </Box>
      </Container>
    </header>
  );
};

export default Header;
