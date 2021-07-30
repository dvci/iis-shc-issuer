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
        >
          <Typography variant="h6">
            {props.children}
          </Typography>
        </Button>
      </Box>
    </div>
  );
};

/* solution for free-case buttons, but no color :(
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

const DownloadButton = (props) => {

  const theme = createMuiTheme({
    typography: {
      button: {
        backgroundColor: "#2da39d",
        textColor: "white",
        width: "400px",
        textTransform: "none"
      }
    }
  });

  return (
    <div>
      <Box display="flex" flexDirection="column" justifyContent="center" mx={2}>
        <MuiThemeProvider theme={theme}>
          <Button
            variant="contained"
            disableElevation
          >
            {props.children}
          </Button>
        </MuiThemeProvider>
      </Box>
    </div>
  );
};
*/

export default DownloadButton;
