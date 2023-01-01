require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    hardhat:{
      forking:{
        url: process.env.ETH_URL,
        blockNumber: 16312883
       },
    },
    goerli:{
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY]

    }
 
  }


};
