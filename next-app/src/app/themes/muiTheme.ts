import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  typography: {
    fontFamily: 'Rubik',
  },
  palette: {
    primary: {
      light: '#a0a2ff',
      main: '#80a3ff',
      dark: '#8587D4',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffffaf',
      main: '#ffe16d',
      dark: '#ecb73c',
      contrastText: '#000',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          // lineHeight: '1.5', 
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#e5e5e5",
        },
      },
    },
  },
});

  

