// context/EthersProviderContext.tsx
import {Dispatch, SetStateAction, createContext } from 'react';
import { BrowserProvider, Signer, Contract } from "zksync-ethers";


interface IProviderContext {
 provider: BrowserProvider | null;
 setProvider: Dispatch<SetStateAction<BrowserProvider | null>>;
 signer: Signer | null;
 setSigner: Dispatch<SetStateAction<Signer | null>>;
 tokenContract: Contract | null;
 setTokenContract: Dispatch<SetStateAction<Contract | null>>;
 gameContract: Contract | null;
 setGameContract: Dispatch<SetStateAction<Contract | null>>;
 tokenContractAddress: string,
 gameContractAddress: string,
 children: React.ReactNode;
}

const defaultSetProvider: Dispatch<SetStateAction<BrowserProvider | null>> = () => {
    throw new Error('setProvider function is not provided');
};

const defaultSetSigner: Dispatch<SetStateAction<Signer | null>> = () => {
    throw new Error('setSigner function is not provided');
};

const defaultSetTokenContract: Dispatch<SetStateAction<Contract | null>> = () => {
    throw new Error('setTokenContract function is not provided');
};

const defaultSetGameContract: Dispatch<SetStateAction<Contract | null>> = () => {
    throw new Error('setGameContract function is not provided');
};

const ProviderContext = createContext<IProviderContext>({ 
    provider: null, 
    setProvider: defaultSetProvider,
    signer: null, 
    setSigner: defaultSetSigner,
    tokenContract: null, 
    setTokenContract: defaultSetTokenContract,
    gameContract: null, 
    setGameContract: defaultSetGameContract,
    tokenContractAddress: '',
    gameContractAddress: '',
    children: null 
});

export default ProviderContext;
