import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Button, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { notifications } from "@mantine/notifications";
import ProviderContext from '../provider/ProviderContext';
import { ToggleMenuContext } from './ToggleMenuContext'; 
import { BrowserProvider, Signer, Contract } from "zksync-ethers";
import { ethers } from "ethers";

export default function Header() {
    const { provider, setProvider, signer, setSigner } = useContext(ProviderContext);
    const [isConnected, setIsConnected] = useState(false);
    const { toggleMenuValue, setToggleMenuValue } = useContext(ToggleMenuContext);
    const [signerAddress, setSignerAddress] = useState<string>('Connect wallet');
    const [activePage, setActivePage] = useState(true);
    console.log('Header toggleMenuValue: ', toggleMenuValue);
    
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        selectedPage: boolean,
      ) => {
        if (selectedPage === null) return;
        console.log('selectedPage: ', selectedPage);
        console.log('activePage: ', activePage);
            if (selectedPage !== activePage) {
            setActivePage(selectedPage);
            console.log('Header handleChange b toggleMenuValue: ', toggleMenuValue);
            setToggleMenuValue(selectedPage);
            console.log('Header handleChange a toggleMenuValue: ', toggleMenuValue);
            }
      };

    async function handleWalletConnect() {
        if (window.ethereum) {
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            const requiredChainId = '0x12c';
            if (currentChainId !== requiredChainId) {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: requiredChainId }],
                });
            }
            if (provider === null) {
                const browserProvider = new BrowserProvider(window.ethereum as any);
                setProvider(browserProvider);
                setIsConnected(true);
                const browserSigner = await browserProvider?.getSigner() as Signer;
                setSigner(browserSigner);
                const formattedAddress: string = `${browserSigner?.address.slice(0,6)}...${browserSigner?.address.slice(browserSigner?.address.length-4, browserSigner?.address.length)}`;
                setSignerAddress(formattedAddress);
                // const tokenAddress = contractsData[0]['token-address'];
                // console.log('tokenAddress:', tokenAddress);
                // const tokenAbi = tokenJson.abi as InterfaceAbi;
                // const newTokenContract = new Contract(tokenAddress, tokenAbi, signer);
                // const newTokenContract = new Contract(tokenAddress, tokenAbi, browserProvider);
                // console.log('connectWallet Token contract address', await newTokenContract.getAddress());
                // const contractBalance = ethers.formatEther(await newTokenContract.balanceOf(signerAddress));
                // console.log('contractBalance:', contractBalance);
                // setContractBalance(contractBalance);
                // const prizePool = contractBalance * 80 / 100;
                // console.log('prizePool:', prizePool);
                // setPrizePool(prizePool);
                // await tokenContract.mint(signer.address, 1000);
                // notifications.show({
                //     message: `Wallet has been connected.`,
                //     color: "green",
                //     autoClose: 4000,
                // } else {
                //     console.error("Can't connect to the browser provider");
                // }
            } else {
                setIsConnected(false);
                setSignerAddress('Connect wallet');
            }
        } else {
            notifications.show({
                message: `Metamask hasn't been detected. Install Metamask.`,
                color: "red",
                autoClose: 4000,
            });
            // setSignerAddress('Connect wallet');
            console.error("Metamask hasn't been detected. Install Metamask.");
        }
    }

    useEffect(() => {
        if (!isConnected) {
            setProvider(null);
            setSigner(null);
        }
     }, [isConnected, provider, setProvider, signer, setSigner]);

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
                    <img 
                        src="eth.svg"
                        alt="eth.svg"
                        width='30px'    
                    />
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ ml: 3 }}
                    >
                        GUESSING GAME
                    </Typography>
                    <ToggleButtonGroup
                        value={activePage}
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
                        onClick={() => handleWalletConnect()}
                    >
                        {!isConnected 
                            ? "Connect wallet" 
                            : signerAddress 
                        }
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}