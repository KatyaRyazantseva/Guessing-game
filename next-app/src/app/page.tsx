'use client'
import React, { useState, useEffect } from 'react';
import { useEthereum } from './web3/Context';
import { ErrorDescription, ethers } from 'ethers';
import { useEthBalance, useTokenBalance } from '../hooks/useBalance';
import { usePrizePool } from '../hooks/usePrizePool';
import { useGuessSecretNumber } from '../hooks/contractReadWrite';
import {Typography, Button, Stack, Box, CardMedia, Divider, CircularProgress } from '@mui/material';
import StyledNumberInput from '../components/StyledNumberInput';
import Confetti from 'react-confetti';
import { Notifications, notifications } from "@mantine/notifications";
import { SecretNumberActionStatus, NotificationStatusColor } from '../utils/enums';
import { gameContractConfig } from "../app/web3/contracts";

export default function Guess() {
    const { account, getProvider } = useEthereum();
    const { ethBalance: walletEthBalance, fetchEthBalance: fetchWalletEthBalance } = useEthBalance(account.address);
    const { tokenBalance: walletGuessBalance, fetchTokenBalance: fetchWalletGuessBalance } = useTokenBalance(account.address);
    const { prizePool: prizePool, fetchPrizePool: fetchPrizePool }  = usePrizePool();
    const [guessNumber, setGuessNumber] = useState<number | null | undefined>(null); 
    const [isConfettiVisible, setIsConfettiVisible] = useState(false);
    const { 
        guessResult: guessResult, 
        guessSecretNumber: guessSecretNumber,
        guessError: guessError,
        guessInProgress: guessInProgress
     }  = useGuessSecretNumber();
    
    const handleInputChange = (event: any, inputValue: number | null | undefined) => {
        if ((inputValue != undefined) && (inputValue >=1) && (inputValue <= 10)) {
            setGuessNumber(inputValue);
        }
    };

    const handleClick = async () => { 
        if (guessNumber == null) {
            notifications.show({
                title:  SecretNumberActionStatus.Error,
                message: "Incorrect number!",
                color: NotificationStatusColor.Error,
                autoClose: 4000,
            });
            return;
        };
        try {
            await guessSecretNumber(guessNumber);
        } catch (e) {
            const err = e instanceof Error ? e : new Error("An unexpected error occurred.")
            notifications.show({
                title: SecretNumberActionStatus.Error,
                message: err.message,
                color: NotificationStatusColor.Error,
                autoClose: 4000,
            });
        } 
        updateBalances();   
    };

    useEffect(() => {
        if (guessResult == null) return;
        if (guessResult?.status === 1) {
            const gameInterface = new ethers.Interface(gameContractConfig.abi);
            guessResult.logs.forEach(log => {
                try {
                    const parsedLog = gameInterface.parseLog(log);
                    if ((parsedLog != null && parsedLog.name as string) === "Winner") {
                        notifications.show({
                            title: "Yeaaaah!!!",
                            message: "Congratulations! You've guessed the secret number!",
                            color: NotificationStatusColor.Success,
                            autoClose: 4000,
                        });
                        setIsConfettiVisible(true);
                        setTimeout(() => setIsConfettiVisible(false), 5000); 
                        setGuessNumber(null); 
                        updateBalances();
                        return;   
                    };
                    if ((parsedLog != null && parsedLog.name as string) === "Loser") {
                        notifications.show({
                            title: "Oops! :(",
                            message: "This time you haven't succeeded. Try again!",
                            color: NotificationStatusColor.Failed,
                            autoClose: 4000,
                        });
                        updateBalances();
                    } 
                } catch {
                    notifications.show({
                        title: 'Error',
                        message: "Parcing logs error!",
                        color: "red",
                        autoClose: 4000,
                    })
                }
            })
        } else {
            notifications.show({
                title: 'Error',
                message: "Unexpected result!",
                color: "red",
                autoClose: 4000,
            })
        };
    }, [guessResult]);

    useEffect(() => {
        if (guessError != null) {
            const gameInterface = new ethers.Interface(gameContractConfig.abi);
            const parsedError = gameInterface.parseError((guessError as any).data);
            notifications.show({
                title: SecretNumberActionStatus.Error,
                message: parsedError instanceof ErrorDescription ? parsedError.name : parsedError!.args[0],
                color: NotificationStatusColor.Error,
                autoClose: 4000,
            });
        }
    }, [guessError]); 

    function updateBalances() {
        fetchWalletEthBalance();
        fetchWalletGuessBalance();
        fetchPrizePool();
    };

    useEffect(() => {
        updateBalances();
    }, [account.address, getProvider]);  

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "calc(100vh - 64px)", width: '100%', backgroundColor: '#e5e5e5' }}
        >   
            <Notifications />
            {isConfettiVisible && <Confetti />}
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
                            Guess the number
                        </Typography>
                        <Divider/>
                        <Typography color="primary.contrastText" align="center" variant='h6'>
                            {`Prize pool: ${prizePool 
                                    ? Number(ethers.formatEther(prizePool as bigint)).toFixed(4)
                                    : ""} ETH`}
                        </Typography>
                        <Typography color="primary.contrastText" align="center" variant='h6'>
                            Your bet is 0.001 ETH
                        </Typography>
                        <StyledNumberInput 
                            value={guessNumber} 
                            onChange={handleInputChange}
                        />
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                            in the range of 1 to 10
                        </Typography>
                        {guessInProgress ?
                            <Box sx={{ position: 'relative' }}>
                                <Button 
                                    color="secondary" 
                                    variant="contained" 
                                    sx={{ minWidth: '170px', maxWidth: '170px' }} 
                                    onClick={() => handleClick()}                             
                                >
                                    Pending...   
                                </Button>
                                <CircularProgress
                                    size={20}
                                    sx={{
                                    color: '#000',
                                    position: 'absolute',
                                    top: '8px',
                                    left: '15px',
                                    }}
                                />
                            </Box> :
                            <Button 
                                color="secondary" 
                                variant="contained" 
                                sx={{ minWidth: '170px', maxWidth: '170px', marginBottom: '30px' }}
                                disabled = { account.isConnected ? false : true }
                                onClick={() => handleClick()}                             
                            >
                                Guess
                            </Button>
                        }
                        <Divider/>
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontWeight: 'normal' }}>
                            {`Your ETH balance: ${walletEthBalance 
                                ? Number(ethers.formatEther(walletEthBalance)).toFixed(4)
                                : ""} ETH`
                            } 
                        </Typography>
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontWeight: 'normal' }}>
                            {`Your GUESS balance: ${walletGuessBalance
                                ? Number(ethers.formatUnits(walletGuessBalance as bigint, 18)).toFixed(4)
                                : ""} GUESS`
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