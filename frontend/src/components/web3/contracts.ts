import GuessingTokenAbi from "./abi/GuessingTokenAbi.json";
import GuessingGameAbi from "./abi/GuessingGameAbi.json";


export const tokenABI = GuessingTokenAbi;
export const gameABI = GuessingGameAbi;

export const guessTokenContractConfig = {
  address: "0xB93cDC20321D10DB27368e9BD1F141DECa943468",
  abi: tokenABI,
} as const;

export const gameContractConfig = {
  address: "0x54d3B3dc5c7b5bF80864A33021BAb7Ef58C50317",
  abi: gameABI,
} as const;
