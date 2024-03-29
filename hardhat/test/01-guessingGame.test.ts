import { expect } from "chai";
import "@matterlabs/hardhat-zksync-chai-matchers";
import { Contract, Wallet } from "zksync-ethers";
import { getWallet, deployContract, LOCAL_RICH_WALLETS } from '../deploy/utils';
import * as ethers from "ethers";


describe("GuessingGame", function () {
 let gameContract: Contract;
 let tokenContract: Contract;
 let ownerWallet: Wallet;
 let userWallet: Wallet;

 const secretNumber = ethers.encodeBytes32String("10");
 const userWrongNumber = BigInt(7);
 const userRightNumber = BigInt(10);
 
 beforeEach(async function () {
    ownerWallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey);
    userWallet = getWallet(LOCAL_RICH_WALLETS[1].privateKey);
    tokenContract = await deployContract("GuessingToken", [], { wallet: ownerWallet, silent: true });
    gameContract = await deployContract("GuessingGame", [ownerWallet.address, await tokenContract.getAddress()], { wallet: ownerWallet, silent: true });
 });

  it("Should set the correct owner", async function () {
    expect(await gameContract.owner()).to.equal(ownerWallet.address);
  });

  it("Should allow the owner to set a secret number", async function () {
    await gameContract.setSecretNumber(secretNumber);              
    expect(await gameContract.secretNumber()).to.equal(secretNumber);
  });

  it("Should emit Secret event", async function () {
    expect(await gameContract.setSecretNumber(secretNumber))
    .to.emit(gameContract, "Secret")
    .withArgs(ownerWallet.address, secretNumber);
  });

  it("Should revert when a user sets a secret number", async function () {
    await expect(gameContract.connect(userWallet).setSecretNumber(secretNumber))
    .to.be.revertedWithCustomError(tokenContract, "OwnableUnauthorizedAccount");
  });

  it("Should revert when the owner plays", async function () {
    await expect(gameContract.guess(userRightNumber, { value: ethers.parseEther("0.001") }))
      .to.be.revertedWith("Owner can't play");
  });

  it("Should revert when ether not sent", async function () {
    await expect(gameContract.connect(userWallet).guess(userRightNumber))
      .to.be.revertedWith("Must send 0.001 ETH to play");
  });

  it("Should revert with wrong ether amount", async function () {
    await expect(gameContract.connect(userWallet).guess(userRightNumber, { value: ethers.parseEther("0.0005") }))
      .to.be.revertedWith("Must send 0.001 ETH to play");
  });

  it("Should allow a user to win", async function () {
    await gameContract.setSecretNumber(secretNumber);
    expect(await gameContract.connect(userWallet).guess(userRightNumber, { value: ethers.parseEther("0.001") }))
    .to.emit(gameContract, "Winner")
  .withArgs(userWallet.address, userRightNumber, await gameContract.getPrizeAmount());
  });

  it("Should allow a user to lose", async function () {
  await gameContract.setSecretNumber(secretNumber);
  expect(await gameContract.connect(userWallet).guess(userWrongNumber, { value: ethers.parseEther("0.001") }))
  .to.emit(gameContract, "Loser")
    .withArgs(userWallet.address, userWrongNumber);
  });

  it("Should calculate the prize amount correctly", async function () {
    await gameContract.setSecretNumber(secretNumber);
    await gameContract.connect(userWallet).guess(secretNumber, { value: ethers.parseEther("0.001") });
    const prizeAmount = await gameContract.getPrizeAmount();
    expect(prizeAmount).to.equal(ethers.parseEther("0.0008")); 
  });
});
