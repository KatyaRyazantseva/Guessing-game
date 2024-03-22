import { deployContract } from "./utils";

export default async function () {
  const tokenContractName = "GuessingToken";
  await deployContract(tokenContractName);

  const gameContractName = "GuessingGame";
  const constructorArguments = [""];
  await deployContract(tokenContractName, constructorArguments);

}
