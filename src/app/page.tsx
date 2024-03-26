'use client'
import { useState } from "react";
import { useEthereum } from "../components/web3/Context";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./themes/muiTheme";
import { MantineProvider } from '@mantine/core';
import { ToggleMenuContext } from '../components/ToggleMenuContext';
import Header from "../components/Header";
import GuessCard from "../components/GuessCard";

export default function Page() {
  const { account } = useEthereum();
  const [toggleMenuValue, setToggleMenuValue] = useState(true);

  return (
    <ThemeProvider theme={muiTheme}>
      <MantineProvider>
        <ToggleMenuContext.Provider value={{ toggleMenuValue, setToggleMenuValue }}>
          <Header/>
          <GuessCard/>
        </ToggleMenuContext.Provider>
        </MantineProvider>
    </ThemeProvider>
    
  );
}
