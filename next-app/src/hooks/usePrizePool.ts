import { useEthereum } from '../app/web3/Context';
import { useAsync } from './useAsync';
import { Contract } from 'zksync-ethers';
import { gameContractConfig } from "../app/web3/contracts";

export function usePrizePool() {
  const { account, getProvider } = useEthereum();
    const { result: prizePool, execute: fetchPrizePool } = useAsync(async () => {
      const provider = getProvider();
      const contractGame = new Contract(gameContractConfig.address, gameContractConfig.abi, provider);
      const contractPrizePool = await contractGame.getPrizeAmount();
      return contractPrizePool;
    });  

  return { prizePool, fetchPrizePool };
};

