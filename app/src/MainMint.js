import {useState, useEffect} from 'react';
import {ethers, BigNumber} from 'ethers';
import NFTRoyalties from './NFTRoyalties.json';

const NFTRoyaltiesAddress = "0xbc04C3C2dCA02Fbd6eE03A7CD6f9973CFbf53ffD";


const MainMint = ({accounts,setAccounts, isImg, setIsImg, imgUrl, setImgUrl})=>{
    const[mintAmount, setMintAmount] = useState(1); //Create another state to select quantity
    const isConnected = Boolean(accounts[0]);
    const [data,setData] = useState({});
    //Metadata CID
    const BASE_URI = "QmXTBUekh3KjaMZZuDCtUf3QfHfHsR3mjKX1pe5ZiWZD3z";
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
                console.log(accounts[0]);
                const cost = await contract.PRICE();
                /*Part where the response gives the whole transaction obj rather than the tokenId*/
                const response = await contract.mintToken(accounts[0],{value:cost});
                console.log("response: ",response.hash);

                /*Potential Code for getting the tokenId, but i couldn't manage to import in the web3 lib */
                /*web3.eth.getTransactionReceipt(response.hash).then(function(data){
                    let transaction = data;
                    let logs = data.logs;
                    console.log(logs);
                    console.log(web3.utils.hexToNumber(logs[0].topics[3]));
                });*/
                
                /*Making the API Call for the image ipfs CID*/
                var urL = "http://localhost:8080/NFT/meta/" + BASE_URI + "/" + parseInt(response.chainId+1);
                //console.log(urL);
                fetch(urL)
                .then(res => res.json())
                .then(res => res.image)
                .then(data => setData(data));
                console.log(data);

                /*Extracting the image ipfs CID*/
                var imgAdd = data;
                imgAdd = imgAdd.slice(7, -6);
                console.log(imgAdd);
                
                /*Combining the image CID with the NFTId (hardcoded) to get the API Call url for NFT image*/
                var imgURL = "http://localhost:8080/NFT/img/" + imgAdd + "/" + parseInt(response.chainId+1);
                
                /*To update values in main function*/
                setIsImg(imgURL);
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