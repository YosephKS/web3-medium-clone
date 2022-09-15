require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const fs = require("fs");
const mnemonic = fs.existsSync(".secret")
  ? fs.readFileSync(".secret").toString().trim()
  : "";

require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC_NODE,
      chainId: 80001,
      accounts: { mnemonic },
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  paths: {
    artifacts: "./client",
  },
};
