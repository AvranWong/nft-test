import {useState, useEffect} from 'react';
import {ethers, BigNumber} from 'ethers';
import NFTRoyalties from './NFTRoyalties.json';

const NFTRoyaltiesAddress = "0xbc04C3C2dCA02Fbd6eE03A7CD6f9973CFbf53ffD";


const MainMint = ({accounts,setAccounts, imgUrl, setImgUrl})=>{
    const[mintAmount, setMintAmount] = useState(1); //Create another state to select quantity
    const isConnected = Boolean(accounts[0]);
    const [data,setData] = useState({});
    //Metadata CID
    const JSON_CID = "QmXTBUekh3KjaMZZuDCtUf3QfHfHsR3mjKX1pe5ZiWZD3z";
    const IMG_CID = "QmTL9uxGtENJzAWnd3oXu58UTfpEy4p1oSnVA6AqZdqUW5"

    async function HandleMint(){
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
                console.log("Minting on Account: ",accounts[0]);
                const cost = await contract.PRICE();
                /*Part where the response gives the whole transaction obj rather than the tokenId*/
                const response = await contract.mintToken(accounts[0],{value:cost});
                //Code to tokenID, uses a ethers event listener for transfer, then parses the logs to get topic 3
                contract.on('Transfer', (from,to, tokenId) => {
                    console.log("In event listener");
                    //Converts bignumber to int
                    console.log("Token ID: ", parseInt(tokenId));
                  });
                /*Making the API Call for the image ipfs CID*/
                var JSON_URL = "http://localhost:8080/NFT/meta/" + JSON_CID + "/" + 1;
                console.log("JSON URL: ",JSON_URL);
                fetch(JSON_URL)
                .then(res => res.json())
                .then(res => res.image)
                .then(data => setData(data));
                console.log(data); //Returns null issue is here

                // /*Extracting the image ipfs CID*/
                // var imgAdd = data.slice(7, -6);
                // console.log("Extracted Image CID: ",imgAdd);
                
                /*Combining the image CID with the NFTId (hardcoded) to get the API Call url for NFT image*/
                var imgURL = "http://localhost:8080/NFT/img/" + IMG_CID + "/" + parseInt(1);
                console.log("Image URL: ",imgURL);
                /*To update values in main function*/
                setImgUrl(imgURL);
                
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
                    <button onClick= {HandleMint}> Mint Now</button>
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