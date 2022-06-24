/*To start node.js backend, cd into app-back folder and execute 'npm run dev'*/

//Require Express
const express = require('express');

//Initialize Express
const app = express();

//Enable Cors and requests
const cors = require('cors');
const request = require('request');
app.use(cors());

//Parse JSON
app.use(express.json());

//Set Port and let server listen
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/* Testing purposes to check if API working
app.get('/', function(req, res, next) {
    res.send({image:'12345'});
});
*/

/*Returns NFT Image CID*/
app.get('/NFT/meta/:metaDataCID/:nftID', function(req, res) {
    const metaCID = req.params.metaDataCID;
    //console.log(metaCID) //Check metadata CID
    const nftID = parseInt(req.params.nftID);
    //console.log(nftID) //Check NFT id

    //Get Json metadata file for image
    request({
        url: 'https://gateway.pinata.cloud/ipfs/' + metaCID +'/' + nftID +'.json',
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(body) // Print the json response
            res.send(body)
            }
        })
    });

/*Returns NFT Image png*/
app.get('/NFT/img/:imgDataCID/:nftID', function(req, res) {
    const imgCID = req.params.imgDataCID;
    //console.log(imgCID) //Check image CID
    const nftID = parseInt(req.params.nftID);
    //console.log(nftID) //Check image NFT ID
    var requestSettings = {
        url: 'https://gateway.pinata.cloud/ipfs/' + imgCID + '/' + nftID + '.png',
        method: 'GET',
        encoding: null
    };

    request(requestSettings, function(error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
});