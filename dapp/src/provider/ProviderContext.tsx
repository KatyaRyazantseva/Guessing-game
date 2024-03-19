// context/EthersProviderContext.tsx
import React from 'react';
import { Provider, Signer } from "zksync-ethers";


interface IProviderContext {
 provider: Provider | null;
 signer: Signer | null;
 children: React.ReactNode;
}

const ProviderContext = React.createContext<IProviderContext>({ provider: null, signer: null, children: null });

export default ProviderContext;
