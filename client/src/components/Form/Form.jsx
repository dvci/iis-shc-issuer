import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Form = () => {
  const styles = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [selectedDate, handleDateChange] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const [motherName, setMotherName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [sex, setSex] = useState(null);


  const handleFirstNameChange = event => setFirstName(event.target.value);
  const handleLastNameChange = event => setLastName(event.target.value);
  const handleStreet = event => setStreet(event.target.value);
  const handleCity = event => setCity(event.target.value);
  const handleState = event => setState(event.target.value);
  const handleZip = event => setZip(event.target.value);
  const handleMotherMaidenName = event => setMotherName(event.target.value);
  const handlePhoneNUmber = event => setPhoneNumber(event.target.value);
  const handleSex = event => setSex(event.target.value);
  const enableButton = firstName && lastName && selectedDate;

  const dateFns = new DateFnsUtils();

  function handleSubmit(event) {
    event.preventDefault();
    const searchParams = { given_name: firstName, family_name: lastName,
    patient_dob: dateFns.format(selectedDate, 'yyyyMMdd')};
    if (street) searchParams.street = street;
    if (city) searchParams.city = city; 
    if (state) searchParams.state = state;
    if (zip) searchParams.zip = zip;
    if (motherName) searchParams.motherName = motherName;
    if (phoneNumber) searchParams.phoneNumber = phoneNumber;
    if (sex) searchParams.sex = sex;

    fetch("search?" + new URLSearchParams(searchParams), {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      credentials: "include"
    })
      .then((response) => response.json())
      .then((responseJson) => {
        history.push("/data-found");
      })
      .catch(console.log());
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <TextField
        fullWidth
        variant="filled"
        label="Street"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleStreet}
        />
              <TextField
        fullWidth
        variant="filled"
        label="City"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleCity}
        />
              <TextField
        fullWidth
        variant="filled"
        label="State"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleState}
        />
              <TextField
        fullWidth
        variant="filled"
        label="Zip"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleZip}
        />
        <TextField
        fullWidth
        variant="filled"
        label="Mother's Maiden Name"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleMotherMaidenName}
        />
        <TextField
        fullWidth
        variant="filled"
        label="Phone Number"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handlePhoneNUmber}
        />
        <TextField
        fullWidth
        variant="filled"
        label="Sex"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleSex}
        />
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
