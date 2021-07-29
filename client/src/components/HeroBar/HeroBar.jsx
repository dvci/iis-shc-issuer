import React, { FC } from 'react';
import useStyles from './styles';
import { Switch, Route } from 'react-router-dom';
import { Box, Container, Link, Typography } from '@material-ui/core';

const HeroBar = () => {
  const styles = useStyles();
  return (
    <div className={styles.heroBar}>
      <Container maxWidth="md">
        <Box display="flex" alignItems="center" flexDirection="column" pt={5} pb={4}>
          <Typography variant="h3" component="h2" paragraph={true}>
            <Switch>
              <Route path="/">
                Let's find your digital vaccination record.
              </Route>
              <Route path="/data-found">
                We found your record!
              </Route>
            </Switch>
          </Typography>
          <Typography variant="h5" component="h3" align="center">
            <Switch>
              <Route path="/">
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
              </Route>
              <Route path="/data-found">
                You can import your COVID-19 vaccination record into any app that accepts
                SMART Health by downloading your SMART Health Card or by scannding the QR
                code below.
              </Route>
            </Switch>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default HeroBar;
