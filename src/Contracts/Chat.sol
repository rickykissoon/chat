// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ChatPass is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("ChatPass", "CP"){}

    function newUser(address _user, string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newUserId = _tokenIds.current();

        _mint(_user, newUserId);
        _setTokenURI(newUserId, _tokenURI);

        return newUserId;
    }

}