import React, { FC } from 'react';
import useStyles from './styles';
import { Box, Container, Link, Typography } from '@material-ui/core';

const HeroBar = () => {
  const styles = useStyles();
  return (
    <div className={styles.heroBar}>
      <Container maxWidth="md">
        <Box display="flex" alignItems="center" flexDirection="column" pt={5} pb={4}>
          <Typography variant="h3" component="h2" paragraph={true}>
            Let's find your digital vaccination record.
          </Typography>
          <Typography variant="h5" component="h3" align="center">
            Your&nbsp;
            <Link
              href="https://smarthealth.cards/"
              color="secondary"
              className={styles.link}
              target="_blank"
              rel="noopener"
            >
              SMART Health Card
            </Link>
            &nbsp;contains your verified vaccination record
            that you can share with others if you choose in a safe and
            privacy-preserving way.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default HeroBar;
