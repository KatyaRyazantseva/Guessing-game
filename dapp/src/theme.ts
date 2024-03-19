'use client';
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      primary: {
        light: '#a0a2ff',
        main: '#80a3ff',
        dark: '#6264e9',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffffaf',
        main: '#ffe16d',
        dark: '#ecb73c',
        contrastText: '#fff',
      },
    },
    components: {
      // Name of the component
      MuiAppBar: {
        styleOverrides: {
          // Name of the slot
          root: {
          //   // Some CSS
            backgroundColor: '#6264e9',
          //   color: "white",
          },
        },
      },
    }, 
  });

  export default theme;
  