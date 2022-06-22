
const hre = require("hardhat");
const BASE_URI = "ipfs://QmXTBUekh3KjaMZZuDCtUf3QfHfHsR3mjKX1pe5ZiWZD3z";
const contractURI= "https:xyz";
const royaltyFeesInBips = "2500" //25%
//Set mint price
const PRICE = "100000000000000" // 0.0001 ETH - use whatever price you want, but the denomiation is in WEI

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  
  console.log("Account balance:", (await deployer.getBalance()).toString());
  try {
    const Contract = await hre.ethers.getContractFactory("NFTRoyalties");
    const contract = await Contract.deploy(royaltyFeesInBips,contractURI,BASE_URI, PRICE);
    //const contract = await Contract.deploy();
    await contract.deployed();
  
    console.log(`contract deployed at ${contract.address}`); 
  } catch (error) {
    console.log(error);
  }  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });