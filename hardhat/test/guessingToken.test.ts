import { expect } from "chai";
import "@matterlabs/hardhat-zksync-chai-matchers";
import { Contract, Wallet } from "zksync-ethers";
import { getWallet, deployContract, LOCAL_RICH_WALLETS } from '../deploy/utils';
import * as ethers from "ethers";

describe("MyERC20Token", function () {
  let tokenContract: Contract;
  let ownerWallet: Wallet;
  let userWallet: Wallet;

  before(async function () {
    ownerWallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey);
    userWallet = getWallet(LOCAL_RICH_WALLETS[1].privateKey);

    tokenContract = await deployContract("GuessingToken", [], { wallet: ownerWallet, silent: true });
  });

  it("Should have correct initial supply", async function () {
    const initialSupply = await tokenContract.totalSupply();
    expect(initialSupply).to.equal(BigInt("1000000000000000000000000")); // 1 million tokens with 18 decimals
  });

  it("Owner should have correct initial token balance", async function () {
    const initialBalance = await tokenContract.balanceOf(ownerWallet.address);
    expect(initialBalance).to.equal(BigInt("1000000000000000000000000")); // 1 million tokens with 18 decimals
  });

  it("Should allow owner to mint tokens to owner wallet", async function () {
    const mintAmount = ethers.parseEther("1000"); // Mint 1000 tokens
    const tx = await tokenContract.mint(ownerWallet.address, mintAmount);
    await tx.wait();
    const afterMintSupply = await tokenContract.totalSupply();
    expect(afterMintSupply).to.equal(BigInt("1001000000000000000000000")); // 1,001,000 tokens remaining
    const ownerBalance = await tokenContract.balanceOf(ownerWallet.address);
    expect(ownerBalance).to.equal(BigInt("1001000000000000000000000")); // 1,001,000 tokens
  });

  it("Should allow owner to mint tokens to user wallet", async function () {
    const mintAmount = ethers.parseEther("1000"); // Mint 1000 tokens
    const tx = await tokenContract.mint(userWallet.address, mintAmount);
    await tx.wait();
    const userBalance = await tokenContract.balanceOf(userWallet.address);
    expect(userBalance).to.equal(BigInt("1000000000000000000000")); // 1,000 tokens
  });

  it("Should fail when user tries to mint tokens", async function () {
    const mintAmount = ethers.parseEther("1000"); // Try to mint 1000 tokens
      await expect(tokenContract.connect(userWallet).mint(userWallet.address, mintAmount))
        .to.be.revertedWithCustomError(tokenContract, "OwnableUnauthorizedAccount");

  });

  it("Should allow user to transfer tokens", async function () {
    const transferAmount = ethers.parseEther("50"); // Transfer 50 tokens
    const tx = await tokenContract.connect(userWallet).transfer(ownerWallet.address, transferAmount);
    await tx.wait();
    const userBalance = await tokenContract.balanceOf(userWallet.address);
    expect(userBalance).to.equal(BigInt("950000000000000000000")); // 950 tokens remained
  });

});

