'use client'

import React, { useContext, useState, useEffect } from 'react';
import { useEthereum } from './web3/Context';
import Image from "next/image";
import { AppBar, Box, Toolbar, Button, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ToggleMenuContext } from './ToggleMenuContext'; 
import { notifications } from "@mantine/notifications";

export default function Header() {
    const { account, connect, disconnect } = useEthereum();
    const { toggleMenuValue, setToggleMenuValue } = useContext(ToggleMenuContext);
    
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        selectedPage: boolean,
      ) => {
        if (selectedPage === null) return;
        if (selectedPage !== toggleMenuValue) {
            setToggleMenuValue(selectedPage);
        };
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar 
                position="static" 
                sx={{ 
                    color: '#f5f5f5', 
                    backgroundColor: 'primary.dark', 
                    display: 'flex' 
                }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Image 
                        src="eth.svg"
                        alt="eth.svg"
                        width={30} 
                        height={30}   
                    />
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ ml: 3 }}
                    >
                        GUESSING GAME
                    </Typography>
                    <ToggleButtonGroup
                        value={toggleMenuValue}
                        color="secondary"
                        exclusive={true}
                        onChange={handleChange}
                        aria-label="main menu"
                        sx={{ 
                            flexGrow: 1, 
                            display: 'flex', 
                            justifyContent:'center' 
                        }}
                    >
                        <ToggleButton value={true}>
                            <Typography variant="h6" >
                                GUESS
                            </Typography>
                        </ToggleButton>
                        <ToggleButton value={false}>
                            <Typography variant="h6" >
                                PICK
                            </Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Button 
                        color="inherit" 
                        variant="outlined"
                        sx={{ minWidth: '155px', maxWidth: '155px'}}
                        onClick={() => { account.isConnected ? disconnect() : connect() }}
                    >
                        {account.isConnected 
                            ? `${account.address.slice(0,6)}...${account.address.slice(account.address.length-4, account.address.length)}` 
                            : "Connect wallet"
                        }
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}