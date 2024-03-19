import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Button, Typography } from '@mui/material';
import { notifications } from "@mantine/notifications";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ProviderContext from '../provider/ProviderContext';
import { BrowserProvider, Signer } from "zksync-ethers";


export default function Header() {
    let { provider, signer } = useContext(ProviderContext);
    console.log(provider);
    console.log('Header signer', signer);
    const [isConnected, setIsConnected] = useState(false);
    console.log('Header isConnected: ', isConnected);
    const [signerAddress, setSignerAddress] = useState('');
    console.log('signerAddress: ', signerAddress);
    
    async function connectWallet() {
        if (window.ethereum) {
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            const requiredChainId = '0x12c';
            if (currentChainId !== requiredChainId) {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: requiredChainId }],
                });
              }
            const provider = new BrowserProvider(window.ethereum as any);
            //  console.log(provider);
            if (isConnected) {
                setIsConnected(false);
                setSignerAddress('');
            } else {
                signer = await provider.getSigner() as Signer;
                console.log('Connect signer', signer);
                console.log(`${signer.address?.slice(0,6)}...${signer.address?.slice(signer.address.length-4, signer.address.length)}` ); 
                setIsConnected(true);
                setSignerAddress(await signer.getAddress());
            }
        } else {
            notifications.show({
                message: `Metamask hasn't been detected. Install Metamask.`,
                color: "red",
                autoClose: false,
            });
            setIsConnected(false);
        }
    }

    useEffect(() => {
        if (isConnected) {
          console.log(signerAddress);
        } 
     }, [isConnected, signerAddress]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{  }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <EmojiEventsIcon fontSize="large" color="inherit"/>
                    <Typography variant="h6" component="div" sx={{ ml: 3, flexGrow: 1 }}>
                        GUESSING GAME
                    </Typography>
                    <Button 
                        color="inherit" 
                        variant="outlined"
                        onClick={() => connectWallet()}
                    >
                        {!isConnected ? "Connect wallet" 
                            : `${signerAddress?.slice(0,6)}...${signerAddress?.slice(signerAddress.length-4, signerAddress.length)}` 
                        }
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}