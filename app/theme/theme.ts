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
    body1: {
      fontWeight: 500,
      color: '#000000',
    },
    body2: {
      fontSize: '12px',
      fontWeight: 500,
    },
  },
  // cssVariables: true,
});

export default theme;
