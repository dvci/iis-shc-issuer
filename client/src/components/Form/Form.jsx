import React, { useState } from 'react';
import useStyles from './styles';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Form = () => {
  const styles = useStyles();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [selectedDate, handleDateChange] = useState(null);

  const handleFirstNameChange = event => setFirstName(event.target.value);
  const handleLastNameChange = event => setLastName(event.target.value);
  const enableButton = firstName && lastName && selectedDate;

  return (
    <form>
      <TextField
        required
        fullWidth
        variant="filled"
        label="First Name"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleFirstNameChange}
      />
      <TextField
        required
        fullWidth
        variant="filled"
        label="Last Name"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleLastNameChange}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          required
          fullWidth
          variant="inline"
          label="Date of Birth"
          placeholder="mm/dd/yyyy"
          emptyLabel="mm/dd/yyyy"
          format="MM/dd/yyyy"
          inputProps={{className: styles.datePickerInput}}
          InputProps={{
            disableUnderline: true,
            className: styles.datePicker
          }}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
      <Box width="530px" display="flex" flexDirection="column" mt={2}>
        <Typography variant="caption" className={styles.buttonCaption}>
          * required fields
        </Typography>
        <Button
          disabled={!enableButton}
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
