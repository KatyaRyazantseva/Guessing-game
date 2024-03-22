'use client'
import { useState } from "react";
import { useEthereum } from "../components/web3/Context";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { MantineProvider } from '@mantine/core';
import { ToggleMenuContext } from '../components/ToggleMenuContext';
import Header from "../components/Header";
import GuessCard from "../components/GuessCard";
import { Notifications } from "@mantine/notifications";

// import { Connect } from '../components/Connect'
// import { Account } from '../components/Account'
// import { NetworkSwitcher } from '../components/NetworkSwitcher'
// import { Balance } from '../components/Balance'
// import { BlockNumber } from '../components/BlockNumber'
// import { ReadContract } from '../components/ReadContract'
// import { SendTransaction } from '../components/SendTransaction'
// import { SendTransactionPrepared } from '../components/SendTransactionPrepared'
// import { SignMessage } from '../components/SignMessage'
// import { SignTypedData } from '../components/SignTypedData'
// import { Token } from '../components/Token'
// import { WatchContractEvents } from '../components/WatchContractEvents'
// import { WatchPendingTransactions } from '../components/WatchPendingTransactions'
// import { WriteContract } from '../components/WriteContract'
// import { WriteContractPrepared } from '../components/WriteContractPrepared'

export default function Page() {
  const { account } = useEthereum();
  const [toggleMenuValue, setToggleMenuValue] = useState(true);

  // 

  return (
    <ThemeProvider theme={theme}>
        <ToggleMenuContext.Provider value={{ toggleMenuValue, setToggleMenuValue }}>
          <Header/>
          <GuessCard/>
          <Notifications />
        </ToggleMenuContext.Provider>
    </ThemeProvider>
  );
  // return (
  //   <div>
  //     <h1>zkSync + ethers + Next.js</h1>

  //     <Connect />

  //     {account.isConnected && (
  //       <>
  //         <hr />
  //         <h2>Network</h2>
  //         <p>
  //           <strong>Make sure to connect your wallet to zkSync Testnet for full functionality</strong>
  //           <br />
  //           or update to a different contract address
  //         </p>
  //         <NetworkSwitcher />
  //         <br />
  //         <hr />
  //         <h2>Account</h2>
  //         <Account />
  //         <br />
  //         <hr />
  //         <h2>Balance</h2>
  //         <Balance />
  //         <br />
  //         <hr />
  //         <h2>Block Number</h2>
  //         <BlockNumber />
  //         <br />
  //         <hr />
  //         <h2>Read Contract</h2>
  //         <ReadContract />
  //         <br />
  //         <hr />
  //         <h2>Send Transaction</h2>
  //         <SendTransaction />
  //         <br />
  //         <hr />
  //         <h2>Send Transaction (Prepared)</h2>
  //         <SendTransactionPrepared />
  //         <br />
  //         <hr />
  //         <h2>Sign Message</h2>
  //         <SignMessage />
  //         <br />
  //         <hr />
  //         <h2>Sign Typed Data</h2>
  //         <SignTypedData />
  //         <br />
  //         <hr />
  //         <h2>Token</h2>
  //         <Token />
  //         <br />
  //         <hr />
  //         <h2>Watch Contract Events</h2>
  //         <WatchContractEvents />
  //         <br />
  //         <hr />
  //         <h2>Watch Pending Transactions</h2>
  //         <WatchPendingTransactions />
  //         <br />
  //         <hr />
  //         <h2>Write Contract</h2>
  //         <WriteContract />
  //         <br />
  //         <hr />
  //         <h2>Write Contract (Prepared)</h2>
  //         <WriteContractPrepared />
  //       </>
  //     )}
  //   </div>
  // )
}
