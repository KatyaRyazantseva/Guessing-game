import GuessingTokenAbi from "./abi/GuessingTokenAbi.json";
import GuessingGameAbi from "./abi/GuessingGameAbi.json";


export const tokenABI = GuessingTokenAbi;
export const gameABI = GuessingGameAbi;

export const guessTokenContractConfig = {
  address: "0xB93cDC20321D10DB27368e9BD1F141DECa943468",
  abi: tokenABI,
} as const;

export const gameContractConfig = {
  address: "0x9051Ae552cB76EeE6D2418683e50Dae04367413b",
  abi: gameABI,
} as const;
