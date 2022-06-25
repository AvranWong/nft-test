import { useState } from 'react';
import MainMint from './MainMint';
import NavBar from './NavBar';
import ShowNFT from './ShowNFT';
import './App.css';

function App() {
  const[accounts,setAccounts] = useState([]);
  const [imgUrl, setImgUrl] = useState({});
  
  return (
    <div className="App">
      <MainMint accounts = {accounts} setAccounts = {setAccounts} imgUrl = {imgUrl} setImgUrl = {setImgUrl} ></MainMint>
      <NavBar accounts = {accounts} setAccounts = {setAccounts}></NavBar>
      {/*For showing the NFT image once NFT is Minted */}
      <ShowNFT imgUrl = {imgUrl} ></ShowNFT>
    </div>
  );
}

export default App;
