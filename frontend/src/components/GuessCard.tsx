import React, { useContext, useState, useEffect } from 'react';
import { useEthereum } from './web3/Context';
import { Contract } from 'zksync-ethers';
import { ethers } from 'ethers';
import { guessTokenContractConfig, gameContractConfig } from './web3/contracts';
import { useAsync } from '../hooks/useAsync';
import { ToggleMenuContext } from './ToggleMenuContext'; 
import {Typography, Button, Stack, Box, CardMedia, Divider, CircularProgress } from '@mui/material';
import StyledNumberInput from './StyledNumberInput';
import { Notifications, notifications } from "@mantine/notifications";

export default function GuessCard() {
    const { account, getSigner, getProvider } = useEthereum();
    const { toggleMenuValue } = useContext(ToggleMenuContext);
    const [inputValue, setInputValue] = useState<number | null | undefined>(0); 
    const [isGuessSelected, setIsGuessSelected] = useState<Boolean>(true);
    const [appData, updateAppData] = useState<Boolean>(false);

    const { result: walletEthBalance, execute: fetchWalletEthBalance } = useAsync(address => getProvider()!.getBalance(address));
    const { result: contractEthBalance, execute: fetchContractEthBalance } = useAsync(() => getProvider()!.getBalance(gameContractConfig.address));
    const { result: walletGuessBalance, execute: fetchWalletGuessBalance } = useAsync(async (address) => {
        const provider = getProvider();
        if (!provider) throw new Error("Provider is not available");
        const contract = new Contract(guessTokenContractConfig.address, guessTokenContractConfig.abi, provider);
        return await contract.balanceOf(address);
    });
    const { result: contractGuessBalance, execute: fetchContractGuessBalance } = useAsync(async () => {
        const provider = getProvider();
        if (!provider) throw new Error("Provider is not available");
        const contractToken = new Contract(guessTokenContractConfig.address, guessTokenContractConfig.abi, provider);
        return await contractToken.balanceOf(gameContractConfig.address);
    });

    const { result: prizePool, execute: fetchPrizePool } = useAsync(async () => {
        const provider = getProvider();
        if (!provider) throw new Error("Provider is not available");
        const contractToken = new Contract(guessTokenContractConfig.address, guessTokenContractConfig.abi, provider);
        const contractGame = new Contract(gameContractConfig.address, gameContractConfig.abi, provider);
        const contractPrizePool= await contractGame.getPrizeAmount();
        return contractPrizePool;
    });
    
    const { execute: selectSecretNumber, inProgress: selectInProgress, error: selectError } = useAsync(async (hashedNumber) => {
        const contract = new Contract(gameContractConfig.address, gameContractConfig.abi, await getSigner());
        try {
            const tx = await contract.setSecretNumber(hashedNumber);
            const receipt = await getProvider()!.getTransactionReceipt(tx.hash);
            if (receipt.status === 1) {
                notifications.show({
                    title: 'Success',
                    message: 'The secret number has been selected successfully.',
                    color: "#8587d4",
                    autoClose: 4000,
                });
                setInputValue(0);
            } else {
                notifications.show({
                    title: 'Error',
                    message: "Transaction failed!",
                    color: "red",
                    autoClose: 4000,
                }) 
            }   
        } catch (err) {
            console.log("err: ", err);
            let revertReason;
            try {
                const parsedError = contract.interface.parseError(err.data);
                revertReason = parsedError!.args[0];
            } catch {
                revertReason = "Unknown custom error!";
            };
            notifications.show({
                title: 'Error',
                message: revertReason,
                color: "red",
                autoClose: 4000,
            });
        }  
    });

    const { execute: guessSecretNumber, inProgress: guessInProgress, error: guessError } = useAsync(async (inputValue) => {
        const contract = new Contract(gameContractConfig.address, gameContractConfig.abi, await getSigner());
        try {
            const tx = await contract.guess(inputValue, {value: ethers.parseEther("0.001"),});
            const receipt = await getProvider()!.getTransactionReceipt(tx.hash);
            if (receipt.status === 1) {
                const gameInterface = new ethers.Interface(gameContractConfig.abi);
                receipt.logs.forEach(log => {
                    try {
                        const parsedLog = gameInterface.parseLog(log);
                        if ((parsedLog != null && parsedLog.name as string) === "Winner") {
                            notifications.show({
                                title: 'Yeaaaah!!!',
                                message: "Congratulations! You've guessed the secret number!",
                                color: "#e287d6",
                                autoClose: 4000,
                            });
                            setInputValue(0);
                            return;
                        };
                        if ((parsedLog != null && parsedLog.name as string) === "Loser") {
                            notifications.show({
                                title: 'Oops! :(',
                                message: "This time you haven't guessed the number. Try again!",
                                color: "#8c8c8c",
                                autoClose: 4000,
                            }) 
                            setInputValue(0);
                            return;
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
                    message: "Transaction failed!",
                    color: "red",
                    autoClose: 4000,
                }) 
            }   
        } catch (err) {
            console.log("err: ", err);
            let revertReason;
            try {
                const parsedError = contract.interface.parseError(err.data);
                revertReason = parsedError!.args[0];
            } catch {
                revertReason = "Unknown custom error!";
            };
            notifications.show({
                title: 'Error',
                message: revertReason,
                color: "red",
                autoClose: 4000,
            });
        }  
    });

    const handleInputChange = (event: any, inputValue: number | null | undefined) => {
        setInputValue(inputValue);
     };

    async function handleClick(inputValue: number | null | undefined) {
        if ((inputValue != undefined) && (inputValue >=1) && (inputValue <= 10)) {
            setInputValue(inputValue);            
            if (isGuessSelected) {
                await guessSecretNumber(BigInt(inputValue));
            } else {
                const response = await fetch('/api/hashNumber', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ secretNumber: inputValue }),
                });
                const data = await response.json();
                const hashedNumber = data.hashedNumber;
                selectSecretNumber(hashedNumber);
            }
        } else {
            notifications.show({
                title: 'Error',
                message: 'Incorrect number!',
                color: "red",
                autoClose: 2000,
            });
        };
        updateAppData(true);
    }

    useEffect(() => {
        if (toggleMenuValue) {
            setIsGuessSelected(true);  
        } else {
            setIsGuessSelected(false);
        };
        fetchWalletEthBalance(account.address);
        fetchWalletGuessBalance(account.address);
        fetchContractEthBalance();
        fetchContractGuessBalance();
        fetchPrizePool();
        updateAppData(false);
    }, [toggleMenuValue, account, appData]);

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
                            {isGuessSelected ? "Guess the" : "Choose a"} number
                        </Typography>
                        <Divider/>
                        <Typography color="primary.contrastText" align="center" variant='h6'>
                            {isGuessSelected 
                                ? `Prize pool: ${account.address 
                                    ? (prizePool 
                                        ? Number(ethers.formatEther(prizePool as bigint)).toFixed(4)
                                        : 0)
                                    : ""} ETH` 
                                : "Select a number"
                            } 
                        </Typography>
                        <Typography color="primary.contrastText" align="center" variant='h6'>
                            {isGuessSelected ? "Your bet is 0.001 ETH" : "between 1 to 10"} 
                        </Typography>
                        <StyledNumberInput 
                            value={inputValue} 
                            onChange={handleInputChange}
                        />
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                            {isGuessSelected ? "in the range of 1 to 10" : "only owner can select a number"}
                        </Typography>
                        {(selectInProgress || guessInProgress) ?
                            <Box sx={{ position: 'relative' }}>
                                <Button 
                                    color="secondary" 
                                    variant="contained" 
                                    sx={{ minWidth: '170px', maxWidth: '170px' }} 
                                    onClick={() => handleClick(inputValue)}                             
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
                                onClick={() => handleClick(inputValue)}                             
                            >
                                {isGuessSelected ? "Guess" : "Select"}
                            </Button>
                        
                        }
                        <Divider/>
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontWeight: 'normal' }}>
                            {isGuessSelected 
                                ? `Your ETH balance: ${account.address
                                    ? (walletEthBalance 
                                        ? Number(ethers.formatEther(walletEthBalance as bigint)).toFixed(4)
                                        : 0)
                                    : ""} ETH` 
                                : `Contract ETH balance: ${account.address
                                    ? (contractEthBalance 
                                        ? Number(ethers.formatEther(contractEthBalance as bigint)).toFixed(4)
                                        : 0)
                                    : ""} ETH`
                            }  
                        </Typography>
                        <Typography color="primary.contrastText" align="center" variant="body2"
                            sx={{ fontWeight: 'normal' }}>
                            {isGuessSelected
                                ? `Your GUESS balance: ${account.address 
                                    ? (walletGuessBalance
                                        ? Number(ethers.formatUnits(walletGuessBalance as bigint, 18)).toFixed(4)
                                        : 0) 
                                    : ""} GUESS`
                                : `Contract GUESS balance: ${account.address
                                    ? (contractGuessBalance 
                                        ? Number(ethers.formatUnits(contractGuessBalance as bigint, 18)).toFixed(4)
                                        : 0)
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