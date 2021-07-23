import { createTheme } from '@material-ui/core/styles';

// https://material-ui.com/customization/palette/#adding-new-colors
const colors = {
  // white: '#fff',
  // black: '#222',
  // red: '#d95d77',
  // blue: '#5d89a1',
  blueGreen:'#3c9189',
  // blueLighter: '#9ad2f0',
  // gray: '#4a4a4a',
  // grayMedium: '#bbbdc0',
  // grayBlue: '#cbd5df',
  grayLight: '#e9e9e9',
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
});

export default lightTheme;
