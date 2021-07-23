import React, { FC } from 'react';
import useStyles from './styles';
import { Box, Button, Container, Typography } from '@material-ui/core';

const Header = () => {
  const styles = useStyles();
  return (
    <header className={styles.header}>
      <Container maxWidth="lg">
        <Box display="flex">
          <Typography variant="h6">
            ISS SMART Health Card Issuer
          </Typography>
          {/* <img src="" alt="inferno logo" className={styles.logo} /> */}
        </Box>
      </Container>
    </header>
  );
};

export default Header;
