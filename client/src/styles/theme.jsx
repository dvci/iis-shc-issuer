import { createTheme } from '@material-ui/core/styles';

// https://material-ui.com/customization/palette/#adding-new-colors
const colors = {
  // white: '#fff',
  // black: '#222',
  // red: '#d95d77',
  // blue: '#5d89a1',
  blueGreen:'#2da39d',
  // blueLighter: '#9ad2f0',
  // gray: '#4a4a4a',
  grayMedium: '#c2c2c2',
  // grayBlue: '#cbd5df',
  grayLight: '#eeeeee',
  // grayLighter: '#eaeef2',
  grayDark: '#323841',
  // grayVeryDark: '#3a3a3a',
  // green: '#2fa874',
  // orange: '#F88B30',
  // blueGray: '#e6ebf2',
};

const paletteBase = {
  primary: {
    main: colors.grayDark,
  },
  secondary: {
    main: colors.blueGreen,
  },
  common: colors,
};

const lightTheme = createTheme({
  palette: { ...paletteBase },
  typography: {
    h2: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '1px',
        height: '56px',
      },
      label: {
        textTransform: 'uppercase',
        fontSize: '24px',
        fontWeight: 'bold',
      },
      contained: {
        '&$disabled': {
          color: '#9d9d9d',
          backgroundColor: paletteBase.common.grayMedium,
        },
      },
    },
    MuiInputBase: {
      root: {
        borderRadius: '1px',
        backgroundColor: paletteBase.common.grayLight,
      },
    },
    MuiFilledInput: {
      root: {
        borderRadius: '1px',
        borderTopLeftRadius: '1px',
        borderTopRightRadius: '1px',
      },
    },
    MuiInputLabel: {
      root: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: '3px',
      },
      formControl: {
        position: 'relative',
      },
      filled: {
        '&$shrink': {
          transform: 'none',
        },
      },
    },
    MuiTextField: {
      root: {
        marginBottom: '20px',
      },
    },
  },
});

export default lightTheme;
