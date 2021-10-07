import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';

const DownloadButton = (props) => {
  return (
    <div>
      <Box display="flex" flexDirection="column" justifyContent="center" mx={2}>
        <Button
          color="secondary"
          variant="contained"
          disableElevation
          style={{width: "400px"}}
          disabled={props.disabled}
          onClick={props.onClick}
        >
          <Typography variant="h6">
            {props.children}
          </Typography>
        </Button>
      </Box>
    </div>
  );
};

export default DownloadButton;
