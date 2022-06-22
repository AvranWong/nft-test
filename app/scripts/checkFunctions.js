const hre = require("hardhat");

async function main() {
  try {
    const Contract = await hre.ethers.getContractFactory("NFTRoyalties"); //Change contract name here
    const contract = await Contract.attach(
      "0xc42D9FDD68216992149640003967dCA125ae1690" // The deployed contract address
    );
    //Check if royalties function is working
    const fee = await contract.royaltyInfo(10000);
    //Check if mint was successful
    const tokenID = "1"
    //calls owner of function, input token id and outputs wallet id
    const owner = await contract.ownerOf(tokenID);
    const tokenURI = await contract.tokenURI(tokenID)
    //calls balance of function returns the number of token in wallet
    const balance = await contract.balanceOf(owner); 
    console.log("Result: ", balance);
    console.log("Result: ", owner);
    console.log("Result: ", tokenURI);
    console.log("Royalty info: ", fee);

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