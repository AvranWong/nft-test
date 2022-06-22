/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('dotenv').config();
 require("@nomiclabs/hardhat-waffle");
 const ETH_TEST_PRIVATE_KEY = process.env.GANACHE_KEY;
 module.exports = {
   solidity: "0.8.1",
   networks: {
     ethTest: {
     url:process.env.GANACHE_URL,
     gas: 2100000, gasPrice: 8000000000,
     accounts: [`0x${ETH_TEST_PRIVATE_KEY}`]
   }
  }
 };
