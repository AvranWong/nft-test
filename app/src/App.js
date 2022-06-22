import { useState } from 'react';
import MainMint from './MainMint';
import NavBar from './NavBar'
import './App.css';

function App() {
  const[accounts,setAccounts] = useState([]);
  return (
    <div className="App">
      <MainMint accounts = {accounts} setAccounts = {setAccounts}></MainMint>
      <NavBar accounts = {accounts} setAccounts = {setAccounts}></NavBar>
    </div>
  );
}

export default App;
