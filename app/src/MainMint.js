import {useState} from 'react';
import {ethers, BigNumber} from 'ethers';
import NFTRoyalties from './NFTRoyalties.json';

const NFTRoyaltiesAddress = "0xbc04C3C2dCA02Fbd6eE03A7CD6f9973CFbf53ffD";

const MainMint = ({accounts,setAccounts})=>{
    const[mintAmount, setMintAmount] = useState(1); //Create another state to select quantity
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        if (window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum); //gets provider to access blockchain
            const signer = provider.getSigner(); //gets the signature to sign
            const balance = (await signer.getBalance()).toString();
            console.log(balance);
            const contract = new ethers.Contract(
                NFTRoyaltiesAddress,
                NFTRoyalties.abi,
                signer
            );
            //Call mint functions
            try {
                console.log(accounts[0]);
                const cost = await contract.PRICE();
                const response = await contract.mintToken(accounts[0],{value:cost});
                console.log("response: ",response);

            }catch(err){
                console.log("error: ", err)
            }
        }
    }

    return(
        <div>
            {isConnected ?(
                <div>
                <input type = "number" value = {mintAmount}/>
                <button onClick= {handleMint}> Mint Now</button>
                </div>
            ) : (
                <div>
                <p>you must be connected to mint</p>
                </div>
            )}
        </div>
    );
};

export default MainMint