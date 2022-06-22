import React from 'react';

const NavBar = ({accounts, setAccounts})=>{
    //Passes in a boolean to see if metamask is connected
    const isConnected = Boolean(accounts[0]);

    //Async function to connect metamask account
    async function connectAccount(){
        if (window.ehtereum){
            //Gets accounts in the metamask wallet
            const accounts = await window.ethereum.request({
                method:"eth_requestAccounts",
            });
            setAccounts(accounts); //updates the accounts state
        }
    }
    return(
        <div>
            {/* Connect button that checks if wallet is connected */}
            {isConnected ?(
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount}>Connect</button>
            )}
        </div>
    )
};
export default NavBar