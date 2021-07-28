import React, { ReactNode } from 'react';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import lightTheme from 'styles/theme';

const ThemeProvider = ({ children }) => {
  return <MuiThemeProvider theme={lightTheme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
