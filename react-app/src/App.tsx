import React, { useState } from 'react';
import './App.css';
import '@mantine/notifications/styles.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./themes/theme";
import Header from "./components/Header";
import GuessCard from "./components/GuessCard";
import ZkSyncProvider from './provider/ZkSyncProvider';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ToggleMenuContext } from './components/ToggleMenuContext';

function App() {
  const [toggleMenuValue, setToggleMenuValue] = useState(true);
  return (
    <MantineProvider>
    <Notifications />
    <ThemeProvider theme={theme}>
      <ZkSyncProvider>

            <ToggleMenuContext.Provider value={{ toggleMenuValue, setToggleMenuValue }}>
              <Header/> 
              <GuessCard/>
            </ToggleMenuContext.Provider>
        
      </ZkSyncProvider>
    </ThemeProvider>
    </MantineProvider>
  );
}

export default App;
