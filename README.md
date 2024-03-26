# Guessing game on zkSync Era Testnet

Welcome to the Guessing Game, a thrilling smart contract-based game built on the zkSync Era Testnet. This game allows players to guess a secret number and win a prize if their guess is correct. The game is powered by a smart contract that utilizes the ERC20 token standard for transactions. A winner gets 80% of the contract ether and 100 GUESS tokens.

## Game Rules

- **Bet Amount**: Each game bet requires 0.001 Ether.
- **Secret Number Selection**: Only the owner of the smart contract can select the secret number.

## How to Play

To participate in the Guessing Game, you need to have some testnet ETH. You can learn how obtain testnet ETH from the zkSync docs: [Network Faucets](https://docs.zksync.io/build/tooling/network-faucets.html).

## Playing the Game

You can play the Guessing Game directly on this website [Coming soon...](http://example.com). Alternatively, you can clone the repository and run the game locally as described above.

## Running the Game Locally

To run the game locally clone the repository, install dependencies and lunch the game:

```Shell
    git clone https://github.com/KatyaRyazantseva/Guessing-game.git
    cd next-app
    yarn install
    yarn run dev
```

## zkSync Era Testnet

The Guessing Game is built on the zkSync Era Testnet, a layer 2 scaling solution for Ethereum that uses zero-knowledge proofs to enhance scalability and security. For more information on zkSync Era, visit [zkSync Era Docs](https://docs.zksync.io/).

## Technical Stack

- **Frontend**: The game's web application is built using Next.js + Wagmi.
- **Smart Contracts**: The game's smart contracts are developed using Hardhat.

## Smart Contract Addresses

- **GuessingToken**: [`0xB93cDC20321D10DB27368e9BD1F141DECa943468`](https://sepolia.explorer.zksync.io/address/0xB93cDC20321D10DB27368e9BD1F141DECa943468)
- **GuessingGame**: [`0xCBcC71e3e1ffe9021075e288076F5410EF1Ce266`](https://sepolia.explorer.zksync.io/address/0xCBcC71e3e1ffe9021075e288076F5410EF1Ce266)

## License

This project is licensed under the MIT License.
