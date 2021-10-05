import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Alert from '@material-ui/lab/Alert';


const Form = () => {
  const styles = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [selectedDate, handleDateChange] = useState(null);
  const [error, setError] = useState(null);


  const handleFirstNameChange = event => setFirstName(event.target.value);
  const handleLastNameChange = event => setLastName(event.target.value);
  const enableButton = firstName && lastName && selectedDate;

  const dateFns = new DateFnsUtils();

  function handleSubmit(event) {
    event.preventDefault();
    fetch("search?" + new URLSearchParams({
        given_name: firstName,
        family_name: lastName,
        patient_dob: dateFns.format(selectedDate, 'yyyyMMdd'),
      }), {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      credentials: "include"
    })
      .then((response) => {
        if (response.ok){
          response.json()
        }
        else if (response.status == 404){
          throw Error('Patient not found');
        } 
        else if (response.status == 422){
          throw Error ('Please enter more information.');
        }
        else {
          throw Error (response.status + " Failed Fetch");
        }
        })
      .then((responseJson) => {
        history.push("/data-found");
        setError(null);
      })
      .catch(err => {setError(err.message)});
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && ( <Alert severity="error"> <div> {error}</div> </Alert> )}
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
          type="submit"
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
