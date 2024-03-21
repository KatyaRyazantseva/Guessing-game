import React, { useContext, useState, useEffect } from 'react';
import {Typography, Button, Stack, Box, CardMedia, Divider } from '@mui/material';
import ProviderContext from '../provider/ProviderContext';
import StyledNumberInput from './StyledNumberInput';
import { Contract } from "zksync-ethers";
import { TOKEN_ADDRESS } from '../contracts/address';
import tokenAbi from "../contracts/abi/GuessingTokenAbi.json";
import { ToggleMenuContext } from './ToggleMenuContext'; 
import { notifications } from "@mantine/notifications";


export default function GuessCard() {
    const { provider, signer } = useContext(ProviderContext);
    const [contractBalance, setContractBalance] = useState('0 ETH');
    const [prizePool, setPrizePool] = useState('0 ETH');
    const { toggleMenuValue } = useContext(ToggleMenuContext);
    const [isGuessSelected, setIsGuessConnected] = useState(true);

    function guessNumber() {
        notifications.show({
            title: 'Notification',
            message: 'Guess the number',
          });
        if (provider != null) {
            const tokenContract = new Contract(TOKEN_ADDRESS, tokenAbi, provider);
            // const gameContract = new Contract(TOKEN_ADDRESS, tokenAbi, signer);
        } else {
            console.log('Provider undefined');
            console.log('notifications: ', notifications?.show({message: 'Error'}));
            notifications.show({
                title: 'Error',
                message: 'The wallet is nor connected.',
                color: "red",
                autoClose: 4000,
            });
        }
    }

    function pickNumber() {
        console.log('GuessCard provider: ', provider);
        console.log('GuessCard signer: ', signer);
        if (provider !== null) {
            const tokenContract = new Contract(TOKEN_ADDRESS, tokenAbi, provider);
            // const gameContract = new Contract(TOKEN_ADDRESS, tokenAbi, signer);
        } else {
            console.log('Provider undefined');
        }
    }

    useEffect(() => {
        if (toggleMenuValue) {
            setIsGuessConnected(true);  
        } else {
            setIsGuessConnected(false);
        }
    }, [toggleMenuValue]);

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
                    {isGuessSelected ? (
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
                                Guess the number
                            </Typography>
                            <Divider/>
                            <Typography color="primary.contrastText" align="center" variant='h6'>
                                Prize pool: {prizePool}
                            </Typography>
                            <Typography color="primary.contrastText" align="center" variant='h6'>
                                Your bet is 0.001 ETH
                            </Typography>
                            <StyledNumberInput/>
                            <Typography color="primary.contrastText" align="center" variant="body2"
                                sx={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                                in the range of 1 to 10
                            </Typography>
                            <Button 
                                color="secondary" 
                                variant="contained" 
                                style={{ marginBottom: '30px' }}
                                onClick={() => guessNumber()}
                            >
                                Guess
                            </Button>
                        </Stack>) : (
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
                                Pick a number
                            </Typography>
                            <Divider/>
                            <Typography color="primary.contrastText" align="center" variant="h6">
                                Hide a number between 1 to 10
                            </Typography>
                            <Typography color="primary.contrastText" align="center" variant='h6'>
                                Contract balance: {contractBalance}
                            </Typography>
                            <StyledNumberInput/>
                            <Typography color="primary.contrastText" align="center" variant="body2"
                                sx={{ fontStyle: 'italic', fontWeight: 'normal' }}
                            >
                                only the contract owner can pick a number
                            </Typography>
                            <Button 
                                color="secondary" 
                                variant="contained" 
                                style={{ marginBottom: '30px' }}
                                onClick={() => pickNumber()}
                            >
                                Pick
                            </Button>
                        </Stack>
                    )}
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