import {useState, useEffect} from 'react';
import {ethers, BigNumber} from 'ethers';
import NFTRoyalties from './NFTRoyalties.json';

const NFTRoyaltiesAddress = "0xb3C2422c793bc4632A004255F99E7956Ef4BB217";


const MainMint = ({accounts,setAccounts, imgUrl, setImgUrl})=>{
    const[mintAmount, setMintAmount] = useState(1); //Create another state to select quantity
    const isConnected = Boolean(accounts[0]);
    
    const IMG_CID = "QmQYoc4LgSnvCgbFgj2D6syVxERdFH17MZFR9T5devnXjq"

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
                console.log(response);
                //Code to get tokenID, uses a ethers event listener for transfer, then parses the logs to get topic 3
                var TOKENID = null;
                contract.on('Transfer', (from,to, tokenId) => {
                    console.log("In event listener");
                    //keeps trying to parse tokenId to int as long as its undefined
                    while (!TOKENID){
                        TOKENID = parseInt(tokenId);
                        console.log("Token ID: ", TOKENID);
                    }
                    //Combining the image CID with the TOKENID 
                    var imgURL = "http://localhost:8080/NFT/img/" + IMG_CID + "/" + TOKENID;
                    console.log("Image URL: ",imgURL);
                    /*To update values in main function*/
                    setImgUrl(imgURL);
                  }); 
            }catch(err){
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement =()=>{
        if(mintAmount<=1) return; //so that mint amount cant be lesser than 1
        setMintAmount(mintAmount-1);
    }

    const handleIncrement =() =>{
        if(mintAmount>=5) return; //sets the maximum to 5
        setMintAmount(mintAmount +1);
    }
    return(
        <div>
            {isConnected ?(
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type = "number" value = {mintAmount}/>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick= {HandleMint}> Mint Now</button>
                </div>
            ) : (
                <div>
                <p>You must be connected to mint</p>
                </div>
            )}
        </div>
    );
};

export default MainMint

//Archived code
    //const [data,setData] = useState({});
    //Metadata CID
    //const JSON_CID = "QmXTBUekh3KjaMZZuDCtUf3QfHfHsR3mjKX1pe5ZiWZD3z";
 // /*Making the API Call for the image ipfs CID*/
                // var JSON_URL = "http://localhost:8080/NFT/meta/" + JSON_CID + "/" + 1;
                // console.log("JSON URL: ",JSON_URL);
                // fetch(JSON_URL)
                // .then(res => res.json())
                // .then(res => res.image)
                // .then(data => setData(data));
                // console.log(data); //Returns null issue is here

                // /*Extracting the image ipfs CID*/
                // var imgAdd = data.slice(7, -6);
                // console.log("Extracted Image CID: ",imgAdd);
                