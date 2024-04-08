# zkSync Hardhat project template

This project was scaffolded with [zksync-cli](https://github.com/matter-labs/zksync-cli).

## Project Layout

- `/contracts`: Contains solidity smart contracts.
- `/deploy`: Scripts for contract deployment and interaction.
- `/test`: Test files.
- `hardhat.config.ts`: Configuration settings.

## How to Use

- `yarn compile`: Compiles contracts.
- `yarn deploy`: Deploys using script `/deploy/deploy.ts`.
- `yarn test`: Tests the contracts.

Note: `yarn deploy` is set in the `package.json`. You can also run your files directly, for example: `yarn hardhat deploy-zksync --script deploy.ts`

### Environment Settings

To keep private keys safe, this project pulls in environment variables from `.env` files. Primarily, it fetches the wallet's private key.

Rename `.env.example` to `.env` and fill in your private key:

```
WALLET_PRIVATE_KEY=your_private_key_here...
```

### Network Support

`hardhat.config.ts` comes with a list of networks to deploy and test contracts. Add more by adjusting the `networks` section in the `hardhat.config.ts`. To make a network the default, set the `defaultNetwork` to its name. You can also override the default using the `--network` option, like: `hardhat test --network dockerizedNode`.

### Local Tests and Deploy

Install and set up zkSync In-memory Node using instructions [here](https://docs.zksync.io/build/test-and-debug/era-test-node.html#installing-and-setting-up-era-test-node). Run the node:

```Shell
era_test_node run
```

Running `yarn test` by default runs the hardhat tests. To test the contracts with the inMemoryNode run:

```Shell
yarn test --network inMemoryNode
```

When you run inMemoryNode, it returns 10 test accounts. Get the private key of the Account #0 and add it into your .env file:

```Shell
WALLET_PRIVATE_KEY=<YOUR_inMemoryNode_PRIVATE_KEY>
```

Deploy the contracts into inMemoryNode:

```Shell
yarn deploy --network inMemoryNode
```

If you want to run your app locally with the deployed contracts, put the addresses of the  contracts into `next-app/src/app/web3/contracts.ts`.

Important: zkSync In-memory Node currently supports only the L2 node. If contracts also need L1, use another testing environment like Dockerized Node. Refer to [test documentation](https://era.zksync.io/docs/tools/testing/) for details.

## Useful Links

- [Docs](https://era.zksync.io/docs/dev/)
- [Official Site](https://zksync.io/)
- [GitHub](https://github.com/matter-labs)
- [Twitter](https://twitter.com/zksync)
- [Discord](https://join.zksync.dev/)

## License

This project is under the [MIT](./LICENSE) license.