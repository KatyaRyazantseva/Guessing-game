import React from 'react';
import ReactDOM from 'react-dom/client';
// import '@rainbow-me/rainbowkit/styles.css';
import './index.css';
import App from './App';
// import { WagmiProvider } from 'wagmi';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';

// const client = new QueryClient();

// const config = getDefaultConfig({
//   appName: 'RainbowKit App',
//   projectId: 'YOUR_PROJECT_ID',
//   chains: [
//     {
//       id: 300,
//       name: 'zkSync Sepolia Testnet',
//       // iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
//       // iconBackground: '#fff',
//       nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
//       rpcUrls: {
//         default: { http: ['https://sepolia.era.zksync.dev'] },
//       },
//       blockExplorers: {
//         default: { name: 'zkSync Era Block Explorer', url: 'https://sepolia.explorer.zksync.io/' },
//       },
//       // contracts: {
//       //   multicall3: {
//       //     address: '0xca11bde05977b3631167028862be2a173976ca11',
//       //     blockCreated: 11_907_934,
//       //   },
//       // },
//     }
//   ],
//   ssr: false,
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as Element
);
root.render(
  <React.StrictMode>
    {/* <WagmiProvider config={config}>
    <QueryClientProvider client={client}>
        <RainbowKitProvider locale='en-US'> */}
          <App />
        {/* </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider> */}
  </React.StrictMode>
);


