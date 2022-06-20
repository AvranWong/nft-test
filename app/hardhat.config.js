/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('dotenv').config();
 require("@nomiclabs/hardhat-waffle");
 const ETH_TEST_PRIVATE_KEY = ETH_KEY;
 module.exports = {
   solidity: "0.8.1",
   networks: {
     ethTest: {
     url:GOERLI_URL,
     accounts: [`0x${ETH_TEST_PRIVATE_KEY}`]
   }
  }
 };
