// context/EthersProvider.tsx
import React, { useState, useEffect } from 'react';
import ProviderContext from './ProviderContext';
import { Provider, Signer } from "zksync-ethers";

interface IContextProviderProps {
    children: React.ReactNode;
}

const ZkSyncProvider: React.FC<IContextProviderProps> = ({ children }) => {
    const [provider, setProvider] = useState<Provider | null>(null);
    const signer: Signer | null = null;

 useEffect(() => {
    const initProvider = async () => {
      const sepoliaProvider = new Provider("https://sepolia.era.zksync.dev");
      setProvider(sepoliaProvider);
    };

    initProvider();
 }, []);

 return (
    <ProviderContext.Provider value={{ provider, signer, children }}>
      {children}
    </ProviderContext.Provider>
 );
};

export default ZkSyncProvider;
