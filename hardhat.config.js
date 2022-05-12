require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const fs = require("fs");
const mnemonic = fs.existsSync(".secret")
  ? fs.readFileSync(".secret").toString().trim()
  : "";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  networks: {
    mainnet: {
      url: `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/eth/mainnet`,
      chainId: 1,
      gas: 5000000,
      gasPrice: 5e9,
      accounts: {
        mnemonic,
      },
    },
    ropsten: {
      url: `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/eth/ropsten`,
      chainId: 3,
      gas: 5500000,
      accounts: {
        mnemonic,
      },
    },
    goerli: {
      url: `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/eth/goerli`,
      chainId: 5,
      gas: 4465030,
      gasPrice: 10000000000,
      accounts: {
        mnemonic,
      },
    },
    rinkeby: {
      url: `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/eth/rinkeby`,
      chainId: 4,
      accounts: {
        mnemonic,
      },
    },
    kovan: {
      url: `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/eth/kovan`,
      chainId: 42,
      gas: 3716887,
      accounts: {
        mnemonic,
      },
    },
  },
};
