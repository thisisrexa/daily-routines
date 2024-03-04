import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FCA311',
    },
    secondary: {
      main: '#14213D',
    },
    gray: {
      main: '#e5e5e5',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => `
        body {
          background: ${theme.palette.common.white};
          color: ${theme.palette.text.primary};
          overflow-x: hidden;
          position: relative;
          min-height: 100vh;
        }
      `,
    },
  },
});

export default theme;
