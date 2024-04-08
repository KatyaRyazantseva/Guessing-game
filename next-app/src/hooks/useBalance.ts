import { useEthereum } from '../app/web3/Context';
import { useAsync } from './useAsync';
import { Contract } from 'zksync-ethers';
import { guessTokenContractConfig } from "../app/web3/contracts";

export function useEthBalance(address: string | null) {
  const { getProvider } = useEthereum();
  const { result: ethBalance, execute: fetchEthBalance } = useAsync(() => getProvider()!.getBalance(address!));  

  return { ethBalance, fetchEthBalance };
};

export function useTokenBalance(address: string | null) {
  const { getProvider } = useEthereum();
  const { result: tokenBalance, execute: fetchTokenBalance } = useAsync(async () => {
    const contract = new Contract(guessTokenContractConfig.address, guessTokenContractConfig.abi, getProvider()!);
    return await contract.balanceOf(address);
  });

  return { tokenBalance, fetchTokenBalance };
}

