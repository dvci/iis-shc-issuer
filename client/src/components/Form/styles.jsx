import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  buttonCaption: {
    alignSelf: 'flex-end',
    marginBottom: '0.3em',
    marginRight: '1em',
  },
  datePicker: {
    height: '56px',
    paddingLeft: '12px',
    marginTop: '0',
    backgroundColor: theme.palette.common.grayLight,
  },
  datePickerInput: {
    '&::placeholder': {
      color: '#979797',
    },
  },
  phoneInput: {
    '&::placeholder': {
      height: '56px',
      color: '#979797'
    },
  },
}));
