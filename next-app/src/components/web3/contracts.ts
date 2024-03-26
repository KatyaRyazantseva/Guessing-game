import GuessingTokenAbi from "./abi/GuessingTokenAbi.json";
import GuessingGameAbi from "./abi/GuessingGameAbi.json";


export const tokenABI = GuessingTokenAbi;
export const gameABI = GuessingGameAbi;

export const guessTokenContractConfig = {
  address: "0xB93cDC20321D10DB27368e9BD1F141DECa943468",
  abi: tokenABI,
} as const;

export const gameContractConfig = {
  address: "0xCBcC71e3e1ffe9021075e288076F5410EF1Ce266",
  abi: gameABI,
} as const;
