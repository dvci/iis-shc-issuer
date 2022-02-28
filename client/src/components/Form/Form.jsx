import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, InputAdornment } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Alert from '@material-ui/lab/Alert';
import allFields from './formConfig';

const Form = () => {
  const styles = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [selectedDate, handleDateChange] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [USstate, setUSState] = useState(null);
  const [zip, setZip] = useState("");
  const [mothersName, setMotherName] = useState(null);
  const [phone, setPhoneNumber] = useState("");
  const [sex, setSex] = useState(null);
  const [error, setError] = useState(null);
  const [phoneError, setPhoneError] = useState(false);
  const [zipError, setZipError] = useState(false)
  const handleFirstNameChange = event => setFirstName(event.target.value);
  const handleLastNameChange = event => setLastName(event.target.value);
  const handleStreet = event => setStreet(event.target.value);
  const handleCity = event => setCity(event.target.value);
  const handleUSState = event => setUSState(event.target.value);
  const handleMotherMaidenName = event => setMotherName(event.target.value);
  const handleSex = event => setSex(event.target.value);
  const enableButton = firstName && lastName && selectedDate;

  const dateFns = new DateFnsUtils();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 100,
      },
    },
  };

  function handleSubmit(event) {
    event.preventDefault();
    const searchParams = { given_name: firstName, family_name: lastName,
    patient_dob: dateFns.format(selectedDate, 'yyyyMMdd')};
    if (street) searchParams.street = street;
    if (city) searchParams.city = city; 
    if (USstate) searchParams.state = USstate;
    if (zip) searchParams.zip = zip;
    if (mothersName) {
      searchParams.maiden_name = mothersName;
      searchParams.name_type_code = 'M';
    }
    if (phone) {
      searchParams.area_code = phone.substring(0,3);
      searchParams.local_number = phone.substring(3,9);
    }
    if (sex) searchParams.sex = sex;

    fetch("search?" + new URLSearchParams(searchParams), {
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
      {allFields.fields.firstName.display && 
      <TextField
        required={allFields.fields.firstName.required}
        fullWidth
        variant="filled"
        label="First Name"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleFirstNameChange}
      />
      }

      {allFields.fields.lastName.display && 
      <TextField
        required={allFields.fields.lastName.required}
        fullWidth
        variant="filled"
        label="Last Name"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleLastNameChange}
      />
      }

      {allFields.fields.selectedDate.display && 
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          required={allFields.fields.selectedDate.required}
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
      }

      {allFields.fields.street.display &&
      <TextField
        required={allFields.fields.street.required}
        fullWidth
        variant="filled"
        label="Street"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleStreet}
        />
      }

      {allFields.fields.city.display &&
      <TextField
        required={allFields.fields.city.required}
        fullWidth
        variant="filled"
        label="City"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleCity}
        />
      }

      {allFields.fields.USstate.display && 
      <InputLabel id="select">State 
        <Select
            fullWidth
            labelId="select"
            label="State"
            onChange={handleUSState}
            MenuProps={MenuProps}
            defaultValue=""
          >
          <MenuItem value="AL">Alabama</MenuItem>
          <MenuItem value="AK">Alaska</MenuItem>
          <MenuItem value="AS">American Samoa</MenuItem>
          <MenuItem value="AZ">Arizona</MenuItem>
          <MenuItem value="AR">Arkansas</MenuItem>
          <MenuItem value="CA">California</MenuItem>
          <MenuItem value="CO">Colorado</MenuItem>
          <MenuItem value="CT">Connecticut</MenuItem>
          <MenuItem value="DE">Delaware</MenuItem>
          <MenuItem value="DC">District Of Columbia</MenuItem>
          <MenuItem value="FM">Federated States Of Micronesia</MenuItem>
          <MenuItem value="FL">Florida</MenuItem>
          <MenuItem value="GA">Georgia</MenuItem>
          <MenuItem value="GU">Guam</MenuItem>
          <MenuItem value="HI">Hawaii</MenuItem>
          <MenuItem value="ID">Idaho</MenuItem>
          <MenuItem value="IL">Illinois</MenuItem>
          <MenuItem value="IN">Indiana</MenuItem>
          <MenuItem value="IA">Iowa</MenuItem>
          <MenuItem value="KS">Kansas</MenuItem>
          <MenuItem value="KY">Kentucky</MenuItem>
          <MenuItem value="LA">Louisiana</MenuItem>
          <MenuItem value="ME">Maine</MenuItem>
          <MenuItem value="MH">Marshall Islands</MenuItem>
          <MenuItem value="MD">Maryland</MenuItem>
          <MenuItem value="MA">Massachusetts</MenuItem>
          <MenuItem value="MI">Michigan</MenuItem>
          <MenuItem value="MN">Minnesota</MenuItem>
          <MenuItem value="MS">Mississippi</MenuItem>
          <MenuItem value="MO">Missouri</MenuItem>
          <MenuItem value="MT">Montana</MenuItem>
          <MenuItem value="NE">Nebraska</MenuItem>
          <MenuItem value="NV">Nevada</MenuItem>
          <MenuItem value="NH">New Hampshire</MenuItem>
          <MenuItem value="NJ">New Jersey</MenuItem>
          <MenuItem value="NM">New Mexico</MenuItem>
          <MenuItem value="NY">New York</MenuItem>
          <MenuItem value="NC">North Carolina</MenuItem>
          <MenuItem value="ND">North Dakota</MenuItem>
          <MenuItem value="MP">Northern Mariana Islands</MenuItem>
          <MenuItem value="OH">Ohio</MenuItem>
          <MenuItem value="OK">Oklahoma</MenuItem>
          <MenuItem value="OR">Oregon</MenuItem>
          <MenuItem value="PW">Palau</MenuItem>
          <MenuItem value="PA">Pennsylvania</MenuItem>
          <MenuItem value="PR">Puerto Rico</MenuItem>
          <MenuItem value="RI">Rhode Island</MenuItem>
          <MenuItem value="SC">South Carolina</MenuItem>
          <MenuItem value="SD">South Dakota</MenuItem>
          <MenuItem value="TN">Tennessee</MenuItem>
          <MenuItem value="TX">Texas</MenuItem>
          <MenuItem value="UT">Utah</MenuItem>
          <MenuItem value="VT">Vermont</MenuItem>
          <MenuItem value="VI">Virgin Islands</MenuItem>
          <MenuItem value="VA">Virginia</MenuItem>
          <MenuItem value="WA">Washington</MenuItem>
          <MenuItem value="WV">West Virginia</MenuItem>
          <MenuItem value="WI">Wisconsin</MenuItem>
          <MenuItem value="WY">Wyoming</MenuItem>
      </Select>
      </InputLabel>
      }

      <br></br>
      {allFields.fields.zip.display && 
      <TextField
        required={allFields.fields.zip.required}
        fullWidth
        variant="filled"
        error={zipError}
        value={zip}
        label="Zip"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={(e) => {
          setZip(e.target.value);
          if (e.target.value.length > 5) {
            setZipError(true);
          } else {
            setZipError(false);
          }
        }}
        />
      }

      {allFields.fields.motherName.display && 
      <TextField
        required = {allFields.fields.motherName.required}
        fullWidth
        variant="filled"
        label="Mother's Maiden Name"
        InputLabelProps={{shrink: true}}
        InputProps={{disableUnderline: true}}
        onChange={handleMotherMaidenName}
        />
      }

      {allFields.fields.phone.display && 
      <TextField
        required = {allFields.fields.phone.required}
        type="phone"
        fullWidth
        variant="filled"
        error={phoneError}
        value={phone}
        label="Phone Number"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
          if (e.target.value.length > 10) {
            setPhoneError(true);
          } else {
            setPhoneError(false);
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">
             +1
             </InputAdornment>,
        }}
      />
      }

        <br></br>
      {allFields.fields.sex.display &&
        <InputLabel id="select">Sex
          <Select
              fullWidth
              labelId="select"
              label="Sex"
              onChange={handleSex}
              MenuProps={MenuProps}
              defaultValue=""
            >
              <MenuItem value={"A"}>Ambiguous</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"N"}>Not Applicable</MenuItem>
              <MenuItem value={"O"}>Other</MenuItem>
              <MenuItem value={"U"}>Unknown</MenuItem> 
          </Select>
        </InputLabel>
      }

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
