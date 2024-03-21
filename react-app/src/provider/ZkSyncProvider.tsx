// context/EthersProvider.tsx
import React, { useState, useEffect } from 'react';
import ProviderContext from './ProviderContext';
import { BrowserProvider, Signer, Contract } from "zksync-ethers";
import contractsData from "../contracts/contract-address.json";

interface IContextProviderProps {
    children: React.ReactNode;
}

const ZkSyncProvider: React.FC<IContextProviderProps> = ({ children }) => {
    const [provider, setProvider] = useState<BrowserProvider | null>(null);
    const [signer, setSigner] = useState<Signer | null>(null);
    const [tokenContract, setTokenContract] = useState<Contract | null>(null);
    const [gameContract, setGameContract] = useState<Contract | null>(null);
    const tokenContractAddress: string = contractsData[0]['token-address'];
    const gameContractAddress: string = '';

//  useEffect(() => {
   //  const initProvider = async () => {
   //    // const sepoliaProvider = new Provider("https://sepolia.era.zksync.dev");
   //    // setProvider(sepoliaProvider);

   //  };

   //  initProvider();
//  }, [provider, signer, tokenContract, gameContract]);

 return (
    <ProviderContext.Provider value={{ 
      provider, setProvider, 
      signer, setSigner,
      tokenContract, setTokenContract, 
      gameContract, setGameContract,
      tokenContractAddress,
      gameContractAddress,
      children 
    }}>
      {children}
    </ProviderContext.Provider>
 );
};

export default ZkSyncProvider;
