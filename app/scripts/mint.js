const hre = require("hardhat");

async function main() {
  try {
    const Contract = await hre.ethers.getContractFactory("NFTRoyalties"); //Change contract name here
    const contract = await Contract.attach(
      "0xc42D9FDD68216992149640003967dCA125ae1690" // The deployed contract address
    );
   
    const [minter] = await ethers.getSigners();
    console.log("Account balance:", (await minter.getBalance()).toString());
    //Get contract cost
    const cost = await contract.PRICE();
    console.log(cost);
    //Insert wallet id that is minting, calls mint function
    const tx = await contract.mintToken("0x604C0712df7c79f34c8bB11868F48f863506aC8e",{value:cost}); 
  
    console.log("Minted: ", tx);

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