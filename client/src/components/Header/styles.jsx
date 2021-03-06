import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  header: {
    color: theme.palette.primary.main,
    height: '6em',
    padding: '0.25em 0.25em',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    objectFit: 'contain',
    height: '3.5em',
  },
}));
