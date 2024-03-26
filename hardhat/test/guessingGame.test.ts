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
 
 beforeEach(async function () {
    ownerWallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey);
    userWallet = getWallet(LOCAL_RICH_WALLETS[1].privateKey);
    tokenContract = await deployContract("GuessingToken", [], { wallet: ownerWallet, silent: true });
    gameContract = await deployContract("GuessingGame", [ownerWallet.address, await tokenContract.getAddress()], { wallet: ownerWallet, silent: true });
 });

 describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await gameContract.owner()).to.equal(ownerWallet.address);
    });
 });

 describe("Guessing", function () {
    it("Should allow the owner to set the secret number", async function () {
      await gameContract.setSecretNumber(secretNumber);
      expect(await gameContract.secretNumber()).to.equal(secretNumber);
    });

    it("Should not allow non-owner to set the secret number", async function () {
      await expect(gameContract.connect(userWallet).setSecretNumber(secretNumber)).to.be.reverted;
    });

    it("Should allow a player to guess and win", async function () {
      await gameContract.setSecretNumber(secretNumber);
      expect(await gameContract.connect(userWallet).guess(secretNumber, { value: ethers.parseEther("0.001") }))
    .to.be.equal(true);
      expect(await gameContract.connect(userWallet).guess(secretNumber, { value: ethers.parseEther("0.001") }))
    .to.emit(gameContract, "Winner")
    .withArgs(userWallet.address, secretNumber, await gameContract.getPrizeAmount());
    });

    it("Should allow a player to guess and lose", async function () {
    await gameContract.setSecretNumber(secretNumber);
    const userNumber = "0x0000000000000000000000000000000000000000000000000000000000000001";
    expect(await gameContract.connect(userWallet).guess(userNumber, { value: ethers.parseEther("0.001") }))
    .to.be.equal(false);
    expect(await gameContract.connect(userWallet).guess(userNumber, { value: ethers.parseEther("0.001") }))
      .to.emit(gameContract, "Loser")
      .withArgs(userWallet.address, userNumber);
    });

    it("Should calculate the prize amount correctly", async function () {
      await gameContract.setSecretNumber(secretNumber);
      await gameContract.connect(userWallet).guess(secretNumber, { value: ethers.parseEther("0.001") });
      const prizeAmount = await gameContract.getPrizeAmount();
      expect(prizeAmount).to.equal(ethers.parseEther("0.0008")); 
    });
 });
});
