import React from 'react';

//Check if imageURL is valid, if yes, then show the div with the imported imageURL
const ShowNFT = ({isImg, imgUrl}) => {
    return(
        <div>
            {isImg ? 
                (
                    <div>
                        <img src={imgUrl} alt="Your NFT will appear here"/>
                    </div>
                ) : (
                    <div>
                        <p>Mint your NFT to view it here!</p>
                    </div>
                )}
        </div>
    );
};

export default ShowNFT