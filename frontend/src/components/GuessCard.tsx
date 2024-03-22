import React, { useContext, useState, useEffect } from 'react';
import { useEthereum } from './web3/Context';
import { Contract } from 'zksync-ethers';
import { ethers } from 'ethers';
import { guessTokenContractConfig } from './web3/contracts';
import { useAsync } from '../hooks/useAsync';
import { ToggleMenuContext } from './ToggleMenuContext'; 
import {Typography, Button, Stack, Box, Grid, CardMedia, Divider } from '@mui/material';
import StyledNumberInput from './StyledNumberInput';
// import { notifications } from "@mantine/notifications";

export default function GuessCard() {
    const { account, getProvider } = useEthereum();
    const { toggleMenuValue } = useContext(ToggleMenuContext);
    const [isGuessSelected, setIsGuessSelected] = useState(true);
    const [contractBalance, setContractBalance] = useState('0 ETH');
    const [prizePool, setPrizePool] = useState('0 ETH');
    const { result: walletEthBalance, execute: fetchWalletEthBalance } = useAsync(address => getProvider()!.getBalance(address));
    const { result: walletGuessBalance, execute: fetchWalletGuessBalance } = useAsync(async (address) => {
        const provider = getProvider();
        if (!provider) throw new Error("Provider is not available");
        const contract = new Contract(guessTokenContractConfig.address, guessTokenContractConfig.abi, provider);
        console.log('address: ', address);
        console.log(await contract.balanceOf(account.address));
        return await contract.balanceOf(address);
    });
    // const { result: supply, execute: fetchTotalSupply } = useAsync(async (address) => {
    //     const provider = getProvider();
    //     if (!provider) throw new Error("Provider is not available");
    //     const contract = new Contract(guessTokenContractConfig.address, guessTokenContractConfig.abi, provider);
    //     return await contract.balanceOf();
    // });

    function handleClick() {
        // if (account?.address) {
        //     fetchWalletEthBalance(account.address);
        //     fetchWalletGuessBalance(account.address);
        // }

        // if (account.isConnected) {
            // if (isGuessSelected) {
            // notifications.show({
            //     title: 'Notification',
            //     message: 'Guess the number',
            // });
        //     if (provider != null) {
        //         const tokenContract = new Contract(TOKEN_ADDRESS, tokenAbi, provider);
        //         // const gameContract = new Contract(TOKEN_ADDRESS, tokenAbi, signer);
        //     } else {
        //         console.log('Provider undefined');
        //         console.log('notifications: ', notifications?.show({message: 'Error'}));
        //         notifications.show({
        //             title: 'Error',
        //             message: 'The wallet is nor connected.',
        //             color: "red",
        //             autoClose: 4000,
        //         });
        //     }
        // } else {
        //     console.log('GuessCard provider: ', provider);
        //     console.log('GuessCard signer: ', signer);
        //     if (provider !== null) {
        //         const tokenContract = new Contract(TOKEN_ADDRESS, tokenAbi, provider);
        //         // const gameContract = new Contract(TOKEN_ADDRESS, tokenAbi, signer);
        //     } else {
        //         console.log('Provider undefined');
        //     }
        // }
    }

    useEffect(() => {
        if (toggleMenuValue) {
            setIsGuessSelected(true);  
        } else {
            setIsGuessSelected(false);
        };
            fetchWalletEthBalance(account.address);
            fetchWalletGuessBalance(account.address);
            // console.log(walletGuessBalance);
            // console.log(ethers.formatUnits(walletGuessBalance as bigint, 18));
            // console.log(typeof(account.address && walletGuessBalance));
    }, [toggleMenuValue, account]);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "calc(100vh - 64px)", width: '100%' }}
        >   
            <Box display="flex" style={{  width: '70%' }}>
                <Box
                    display="flex"
                    justifyContent='space-between'
                    sx={{ backgroundColor: "#fff", borderRadius: '16px' }}
                >   
                    <Stack 
                        spacing={2}
                        flexGrow={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"             
                        style={{ marginLeft: '20px', marginRight: '20px' }}
                    >
                        <Typography color="primary.contrastText" align="center" variant="h3"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {isGuessSelected ? "Guess" : "Pick"} the number
                        </Typography>
                        <Divider/>
                        <Typography color="primary.contrastText" align="center" variant='h6'>
                            {isGuessSelected ? `Prize pool: ${prizePool}` : "Think of a number"} 
                        </Typography>
                        <Typography color="primary.contrastText" align="center" variant='h6'>
                            {isGuessSelected ? "Your bet is 0.001 ETH" : "between 1 to 10"} 
                        </Typography>
                        <StyledNumberInput/>
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                            {isGuessSelected ? "in the range of 1 to 10" : "only the contract owner can pick a number"} 
                        </Typography>
                        <Button 
                            color="secondary" 
                            variant="contained" 
                            sx={{ minWidth: '170px', maxWidth: '170px', marginBottom: '30px' }}
                            onClick={() => handleClick()}                             
                        >
                            {isGuessSelected ? "Guess" : "Pick"} 
                        </Button>
                        <Divider/>
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontWeight: 'normal' }}>
                            {isGuessSelected 
                                ? `Your ETH balance: ${account.address && walletEthBalance ? Number(ethers.formatEther(walletEthBalance as bigint)).toFixed(4) : ""} ETH` 
                                : `Contract ETH balance: ${account.address} ETH`
                            }  
                        </Typography>
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontWeight: 'normal' }}>
                            {isGuessSelected
                                ? `Your GUESS balance: ${account.address && walletGuessBalance ? Number(ethers.formatUnits(walletGuessBalance as bigint, 18)).toFixed(4) : ""} GUESS` 
                                : `Contract GUESS balance: ${account.address} GUESS`
                            }
                        </Typography>
                    </Stack>
                    <CardMedia
                        component="img"
                        sx={{ 
                            width: '40%', 
                            backgroundColor: "#f5f5f5", 
                            borderRadius: '16px',
                            borderTopLeftRadius: '0px', 
                            borderBottomLeftRadius: '0px' 
                        }}
                        image="guessing-game.svg"
                        alt="guessing-game.svg"
                    />
                </Box>
            </Box>
        </Box>     
    )
}