// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 public fees;

    // ================= ERROR =================
    error ethersNotSufficient(uint256 ethersAmount);

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 fees_
    ) ERC721(name_, symbol_) {
        fees = fees_;
    }

    /**
     * @dev Minting new NFT to `to` address with certain `uri` + Paying fees to contract owner
     * @param to (address) - destination address to send the newly minted NFTs
     * @param uri (string) - token URI assigned for the newly minted token
     */
    function safeMint(address to, string memory uri) public payable {
        if (msg.value < fees) revert ethersNotSufficient(msg.value);
        payable(owner()).transfer(fees);

        // Minting the new NFT
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        // Return the oversupplied ETH sent to `msg.sender`
        uint256 contractBalance = address(this).balance;
        if (contractBalance > 0) {
            payable(msg.sender).transfer(address(this).balance);
        }
    }

    // ================= INTERNAL FUNCTIONS =================
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
