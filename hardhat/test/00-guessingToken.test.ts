import { expect } from "chai";
import "@matterlabs/hardhat-zksync-chai-matchers";
import { Contract, Wallet } from "zksync-ethers";
import { getWallet, deployContract, LOCAL_RICH_WALLETS } from '../deploy/utils';
import * as ethers from "ethers";

describe("GuessingToken", function () {
  let tokenContract: Contract;
  let ownerWallet: Wallet;
  let userWallet: Wallet;
  const initialMint = ethers.parseEther("1000000");
  const testMintAmount = ethers.parseEther("1000");

  before(async function () {
    ownerWallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey);
    userWallet = getWallet(LOCAL_RICH_WALLETS[1].privateKey);

    tokenContract = await deployContract("GuessingToken", [], { wallet: ownerWallet, silent: true });
  });

  it("Should have correct name", async function () {
    const name = await tokenContract.name();
    expect(name).to.equal("GuessingToken");
  });

  it("Should have correct symbol", async function () {
    const symbol = await tokenContract.symbol();
    expect(symbol).to.equal("GUESS");
  });

  it("Should have correct decimals", async function () {
    const decimals = await tokenContract.decimals();
    expect(decimals).to.equal(18);
  });

  it("Should have correct initial supply", async function () {
    const initialSupply = await tokenContract.totalSupply();
    expect(initialSupply).to.equal(initialMint); // 1 million tokens
  });

  it("Should set correct owner", async function () {
    expect(await tokenContract.owner()).to.equal(ownerWallet.address);
  });

  it("Should have correct owner's initial token balance", async function () {
    const initialBalance = await tokenContract.balanceOf(ownerWallet.address);
    expect(initialBalance).to.equal(initialMint); // 1 million tokens
  });

  it("Should allow owner to mint tokens to owner wallet", async function () {
    const tx = await tokenContract.mint(ownerWallet.address, testMintAmount);
    await tx.wait();
    const ownerBalance = await tokenContract.balanceOf(ownerWallet.address);
    expect(ownerBalance).to.equal(initialMint + testMintAmount); // 1,001,000 tokens
  });

  it("Should allow owner to mint tokens to user wallet", async function () {
    const tx = await tokenContract.mint(userWallet.address, testMintAmount);
    await tx.wait();
    const userBalance = await tokenContract.balanceOf(userWallet.address);
    expect(userBalance).to.equal(testMintAmount); // 1,000 tokens
  });

  it("Should revert when user mints tokens", async function () {
      await expect(tokenContract.connect(userWallet).mint(userWallet.address, testMintAmount))
      .to.be.revertedWithCustomError(tokenContract, "OwnableUnauthorizedAccount");
  });

  it("Should allow user to transfer tokens", async function () {
    const tx = await tokenContract.connect(userWallet).transfer(ownerWallet.address, testMintAmount);
    await tx.wait();
    const userBalance = await tokenContract.balanceOf(userWallet.address);
    expect(userBalance).to.equal(0);
  });

});

