'use client'
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./themes/muiTheme";
import { MantineProvider } from '@mantine/core';
import Header from "../components/Header";

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ThemeProvider theme={muiTheme}>
      <MantineProvider>
        <Header/>
        {children}
      </MantineProvider>
    </ThemeProvider>
  );
}
