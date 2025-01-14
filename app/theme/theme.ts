'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0760FB',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  // cssVariables: true,
});

export default theme;
