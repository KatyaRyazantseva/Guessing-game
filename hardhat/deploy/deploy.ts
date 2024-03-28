import { deployContract, getWallet } from "./utils";
import { ethers } from "ethers";

export default async function () {
  const tokenContractName = "GuessingToken";
  const tokenContract = await deployContract(tokenContractName);

  const tokenAddress = await tokenContract.getAddress();
  
  const gameContractName = "GuessingGame";
  const constructorArguments = [getWallet().address, tokenAddress];
  const gameContract = await deployContract(gameContractName, constructorArguments);

  const transaction = await tokenContract.mint(gameContract.getAddress(), ethers.parseEther("1000000"));
  await transaction.wait();
}
