import { deployContract, getWallet } from "./utils";
import * as hre from "hardhat";
import { ethers } from "ethers";

export default async function () {

  const gameContractName = "GuessingGame";
  const tokenContractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
  const constructorArguments = [getWallet().address, tokenContractAddress];
  const gameContract = await deployContract(gameContractName, constructorArguments);

  const contractArtifact = await hre.artifacts.readArtifact("GuessingToken");

  const tokenContract = new ethers.Contract(
    tokenContractAddress as string,
    contractArtifact.abi,
    getWallet()
  );

  await tokenContract.mint(gameContract.getAddress(), ethers.parseEther("1000000"));

}
