import React from 'react';
import useStyles from './styles';
import { Box, Button, Container, Typography } from '@material-ui/core';

const Header = () => {
  const styles = useStyles();
  return (
    <header className={styles.header}>
      <Container maxWidth="lg">
        <Box display="flex">
          <Typography variant="h6" component="h1">
            ISS SMART Health Card Issuer
          </Typography>
        </Box>
      </Container>
    </header>
  );
};

export default Header;
