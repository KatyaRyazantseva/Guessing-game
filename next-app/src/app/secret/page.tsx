'use client'
import React, { useState, useEffect } from 'react';
import { useEthereum } from '../web3/Context';
import { ethers } from 'ethers';
import { gameContractConfig } from '../web3/contracts';
import { useEthBalance, useTokenBalance } from '../../hooks/useBalance';
import { useSelectSecretNumber } from '../../hooks/contractReadWrite';
import {Typography, Button, Stack, Box, CardMedia, Divider, CircularProgress } from '@mui/material';
import StyledNumberInput from '../../components/StyledNumberInput';
import { Notifications, notifications } from "@mantine/notifications";
import { SecretNumberActionStatus, NotificationStatusColor } from '../../utils/enums';
import parseError from '../../utils/errors';

export default function Select() {
    const { account, getProvider } = useEthereum();
    const { ethBalance: contractEthBalance, fetchEthBalance: fetchContractEthBalance } = useEthBalance(gameContractConfig.address);
    const { tokenBalance: contractGuessBalance, fetchTokenBalance: fetchContractGuessBalance } = useTokenBalance(gameContractConfig.address);
    const [secretNumber, setSecretNumber] = useState<number | null | undefined>(null);  
    const { 
        selectResult: selectResult, 
        selectSecretNumber: selectSecretNumber,
        selectError: selectError,
        selectInProgress: selectInProgress
     }  = useSelectSecretNumber();

    const handleInputChange = (event: any, inputValue: number | null | undefined) => {
        if ((inputValue != undefined) && (inputValue >=1) && (inputValue <= 10)) {
            setSecretNumber(inputValue);
        }
     };

    const handleClick = async () => { 
        if (secretNumber == null) {
            notifications.show({
                title:  SecretNumberActionStatus.Error,
                message: "Incorrect number!",
                color: NotificationStatusColor.Error,
                autoClose: 4000,
            });
            return;
        };
        try {
            await selectSecretNumber(secretNumber);
        } catch {
            notifications.show({
                title: SecretNumberActionStatus.Error,
                message: selectError?.message,
                color: NotificationStatusColor.Error,
                autoClose: 4000,
            });
        }    
    }

    useEffect(() => {
        if (selectResult == null) return;
        if (selectResult?.status === 1) {
            notifications.show({
                title: SecretNumberActionStatus.Success,
                message: "The secret number has been selected successfully.",
                color: NotificationStatusColor.Success,
                autoClose: 4000,
            });
            setSecretNumber(null);
        } else {
            notifications.show({
                title: 'Error',
                message: "Unexpected result!",
                color: "red",
                autoClose: 4000,
            })
        };   
    }, [selectResult]);
    
    useEffect(() => {
        if (selectError != null) {
            const errorMessage = parseError(selectError);
            notifications.show({
                title: SecretNumberActionStatus.Error,
                message: errorMessage,
                color: NotificationStatusColor.Error,
                autoClose: 4000,
            });
        }
    }, [selectError]); 

    function updateBalances() {
        fetchContractEthBalance();
        fetchContractGuessBalance();
    }

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
                            Choose a number
                        </Typography>
                        <Divider/>
                        <Typography color="primary.contrastText" align="center" variant='h6'>
                            Select a number
                        </Typography>
                        <Typography color="primary.contrastText" align="center" variant='h6'>
                            between 1 to 10
                        </Typography>
                        <StyledNumberInput 
                            value={secretNumber} 
                            onChange={handleInputChange}
                        />
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                            only owner can select a number
                        </Typography>
                        {selectInProgress ?
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
                                Select
                            </Button>
                        }
                        <Divider/>
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontWeight: 'normal' }}>
                            {`Contract ETH balance: ${contractEthBalance 
                                ? Number(ethers.formatEther(contractEthBalance)).toFixed(4)
                                : ""} ETH`
                            }   
                        </Typography>
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontWeight: 'normal' }}>
                            {`Contract GUESS balance: ${contractGuessBalance 
                                ? Number(ethers.formatUnits(contractGuessBalance as bigint, 18)).toFixed(4)
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