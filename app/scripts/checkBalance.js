const hre = require("hardhat");

async function main() {
  try {
    const Contract = await hre.ethers.getContractFactory("NFT"); //Change contract name here
    const contract = await Contract.attach(
      "0x9E9C7D5CB44faA15F1929553a13Ac30f9ac79BcF" // The deployed contract address
    );
    
    const tokenID = "4"
    //calls owner of function, input token id and outputs wallet id
    const owner = await contract.ownerOf(tokenID);
    const tokenURI = await contract.tokenURI(tokenID)
    //calls balance of function returns the number of token in wallet
    const balance = await contract.balanceOf(owner); 
    console.log("Result: ", balance);
    console.log("Result: ", owner);
    console.log("Result: ", tokenURI);

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