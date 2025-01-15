'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0760FB',
    },
    text: {
      disabled: '#9F9F9F',
    },
    background: {
      default: '#F9F9F9',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  // cssVariables: true,
});

export default theme;
