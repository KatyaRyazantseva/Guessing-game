import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          width: '100px',
          color: "#fff",
          border: 'none',
          borderRadius: '4px',
          '&.Mui-selected, &.Mui-selected:hover': {
            color: '#fff',
            backgroundColor: '#7677BE',
          }
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        firstButton: {
          borderRadius: '4px',
        },
        lastButton: {
          borderRadius: '4px',
        },
      },
    },
  },
});

  

