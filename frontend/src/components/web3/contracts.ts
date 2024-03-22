import IERC20 from "zksync-ethers/build/abi/IERC20.json";

export const erc20ABI = IERC20;

export const guessTokenContractConfig = {
  address: "0xB93cDC20321D10DB27368e9BD1F141DECa943468",
  abi: erc20ABI,
} as const;
