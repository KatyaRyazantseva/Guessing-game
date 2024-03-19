import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
import Header from "./components/Header";
import GuessCard from "./components/GuessCard";
import ZkSyncProvider from './provider/ZkSyncProvider';
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ZkSyncProvider>
        <Notifications />
        <Header/> 
        <GuessCard/>
      </ZkSyncProvider>
    </ThemeProvider>
  );
}

export default App;
