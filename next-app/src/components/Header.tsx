'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useEthereum } from '../app/web3/Context';
import Image from "next/image";
import NextLink from 'next/link';
import { AppBar, Box, Toolbar, Button, Typography, Link } from '@mui/material';

export default function Header() {
    const { account, connect, disconnect, getProvider } = useEthereum();
    const [ connectButtonLabel, setConnectButtonLabel ] = useState("Connect wallet");
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;
    
    useEffect(() => {
        if (account.isConnected) {
            const shortWalletAddress = `${account.address.slice(0,6)}...${account.address.slice(account.address.length-4, account.address.length)}`;
            setConnectButtonLabel(shortWalletAddress);
        } else {
            setConnectButtonLabel("Connect wallet");
        };
    }, [account.address, getProvider]); 

    return (
        <Box sx={{ flexGrow: 1,  color: '#f5f5f5'}} >
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
                    <Box 
                        color="secondary"
                        sx={{ 
                            flexGrow: 1, 
                            display: 'flex', 
                            justifyContent:'center',
                        }}
                    >
                        <NextLink href="/" passHref legacyBehavior>
                            <Link 
                                variant="h6"
                                color="inherit" 
                                underline="hover"
                                sx={{ mr: 3, textDecoration: isActive('/') ? 'underline' : 'none' }}                            
                            >
                                GUESS
                            </Link>
                        </NextLink>
                        <NextLink href="/secret" passHref legacyBehavior>
                            <Link 
                                variant="h6"
                                color="inherit"
                                underline="hover"
                                sx={{ textDecoration: isActive('/secret') ? 'underline' : 'none' }} 
                            >
                                SECRET
                            </Link>
                        </NextLink>
                    </Box>
                    <Button 
                        color="inherit" 
                        variant="outlined"
                        sx={{ minWidth: '155px', maxWidth: '155px'}}
                        onClick={() => { account.isConnected ? disconnect() : connect() }}
                    >
                        {connectButtonLabel}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}