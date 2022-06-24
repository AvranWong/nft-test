import { useState } from 'react';
import MainMint from './MainMint';
import NavBar from './NavBar';
import ShowNFT from './ShowNFT';
import './App.css';

function App() {
  const[accounts,setAccounts] = useState([]);
  const[isImg, setIsImg] = useState(0);
  const [imgUrl, setImgUrl] = useState({});
  
  return (
    <div className="App">
      <MainMint accounts = {accounts} setAccounts = {setAccounts} isImg = {isImg} setIsImg = {setIsImg} imgUrl = {imgUrl} setImgUrl = {setImgUrl} ></MainMint>
      <NavBar accounts = {accounts} setAccounts = {setAccounts}></NavBar>
      {/*For showing the NFT image once NFT is Minted */}
      <ShowNFT isImg = {isImg} imgUrl = {imgUrl} ></ShowNFT>
    </div>
  );
}

export default App;
