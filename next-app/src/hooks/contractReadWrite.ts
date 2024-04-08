import { useEthereum } from '../app/web3/Context';
import { Contract } from 'zksync-ethers';
import { gameContractConfig } from "../app/web3/contracts";
import { ethers } from 'ethers';
import { useAsync } from './useAsync';
import axios from 'axios';

export function useSelectSecretNumber() {
    const { account, getProvider, getSigner } = useEthereum();
    const { 
        result: selectResult, 
        execute: selectSecretNumber, 
        error: selectError,
        inProgress: selectInProgress
    } = useAsync(async (number) => {
        const hashedNumber = await getHashedNumber(number);
        const contract = new Contract(gameContractConfig.address, gameContractConfig.abi, await getSigner());
        const tx = await contract.setSecretNumber(hashedNumber);
        const receipt = await getProvider()!.getTransactionReceipt(tx.hash);
        return receipt;
    }); 
    return { selectResult, selectSecretNumber, selectError, selectInProgress};
};

export function useGuessSecretNumber() {
    const { account, getProvider, getSigner } = useEthereum();
    const { 
        result: guessResult, 
        execute: guessSecretNumber, 
        error: guessError,
        inProgress: guessInProgress
    } = useAsync(async (number) => {
        const contract = new Contract(gameContractConfig.address, gameContractConfig.abi, await getSigner());
        const ethValue = ethers.parseEther("0.001");
        const tx = await contract.guess(number, {value: ethValue});
        const receipt = await getProvider()!.getTransactionReceipt(tx.hash);
        return receipt;
    }); 
    return { guessResult, guessSecretNumber, guessError, guessInProgress};
};

export async function getHashedNumber(number: number) {
    const response = await axios.post('api/hashNumber', {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(number),
        });
        const hashedNumber = response.data.hashedNumber;
    return hashedNumber;
}
