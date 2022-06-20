/* Put in the NFT file we using here*/
const Contacts = artifacts.require("./Contacts.sol");
module.exports = function(deployer) {
  deployer.deploy(Contacts);
};