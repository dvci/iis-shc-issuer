import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';

const BackButton = () => {
  return (
    <div>
      <Box display="flex" flexDirection="row" justifyContent="flex-start">
        <Button
          color="secondary"
          startIcon={ <ChevronLeft /> }
          component={ Link }
          to="/"
        >
          <Typography variant="h6">
            BACK TO SEARCH
          </Typography>
        </Button>
      </Box>
    </div>
  );
};

export default BackButton;
