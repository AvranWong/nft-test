// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTRoyalties is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    string public contractURI;
    uint96 royaltyFeesInBips;
    address royaltyAddress;
    string public BASE_URI;
    uint256 public MAX_SUPPLY = 10000;
    uint256 public PRICE = 0;

    constructor(uint96 _royaltyFeesInBips, string memory _contractURI, string memory baseURI,uint256 price) ERC721("MyNFT", "NFT") {
        royaltyFeesInBips = _royaltyFeesInBips;
        royaltyAddress = owner();
        contractURI = _contractURI;
        BASE_URI = baseURI;
        PRICE = price;
        setRoyaltyInfo(msg.sender, _royaltyFeesInBips);
    }
    function _baseURI() internal view override returns (string memory) {
        return string(abi.encodePacked(BASE_URI, "/"));
    }
    
    function mintToken(address addr) public payable returns(uint256)
    {
        uint256 supply = totalSupply();
        require(supply <= MAX_SUPPLY, "Would exceed max supply");    
        require(msg.value >= PRICE, "insufficient funds");
        uint256 tokenId = supply + 1;       
        _safeMint(addr, tokenId);
    
        return tokenId;
    }

    function setRoyaltyInfo(address _receiver, uint96 _royaltyFeesInBips) public onlyOwner {
        royaltyAddress = _receiver;
        royaltyFeesInBips = _royaltyFeesInBips;
    }

    function setContractURI(string calldata _contractURI) public onlyOwner {
        contractURI = _contractURI;
    }

    function royaltyInfo(uint256 _salePrice)
        external
        view
        virtual
        returns (address, uint256)
    {
        return (royaltyAddress, calculateRoyalty(_salePrice));
    }

    function calculateRoyalty(uint256 _salePrice) view public returns (uint256) {
        return (_salePrice / 10000) * royaltyFeesInBips;
    }

    function supportsInterface(bytes4 interfaceId)
            public
            view
            override(ERC721, ERC721Enumerable)
            returns (bool)
    {
        return interfaceId == 0x2a55205a || super.supportsInterface(interfaceId);
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}