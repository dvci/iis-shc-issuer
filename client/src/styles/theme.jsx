import { createTheme } from '@material-ui/core/styles';

// https://material-ui.com/customization/palette/#adding-new-colors
const colors = {
  white: '#fff',
  // black: '#222',
  // red: '#d95d77',
  // blue: '#5d89a1',
  blueGreen:'#2da39d',
  blueGreenDark:'#227c78',
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
        color: paletteBase.common.white,
        backgroundColor: paletteBase.common.blueGreen,
        '&$disabled': {
          color: '#9d9d9d',
          backgroundColor: paletteBase.common.grayMedium,
        },
        '&:hover': {
          backgroundColor: paletteBase.common.blueGreenDark,
        }
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
        backgroundColor: paletteBase.common.grayLight,
      },
      input: {
        padding: '18px 12px 17px',
      },
    },
    MuiInput: {
      formControl: {
        "label + &": {
          marginTop: '0',
        },
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
        transform: 'none',
      },
      filled: {
        '&$shrink': {
          transform: 'none',
        },
      },
      shrink: {
        transform: 'none',
      }
    },
    MuiTextField: {
      root: {
        marginBottom: '20px',
      },
    },
  },
});

export default lightTheme;
