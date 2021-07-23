import React from 'react';
import useStyles from './styles';
import { Box, Button, TextField, Typography } from '@material-ui/core';

const Form = () => {
  const styles = useStyles();
  return (
    <form>
      <TextField
        required
        fullWidth
        variant="filled"
        label="First Name"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
      />
      <TextField
        required
        fullWidth
        variant="filled"
        label="Last Name"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
      />
      <Box width="530px" display="flex" flexDirection="column" mt={2}>
        <Typography variant="caption" className={styles.buttonCaption}>
          * required fields
        </Typography>
        <Button
          disabled
          disableElevation
          fullWidth
          size="large"
          variant="contained"
        >
          SEARCH
        </Button>
      </Box>
    </form>
  );
};

export default Form;
