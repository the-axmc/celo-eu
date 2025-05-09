// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract NexusExplorerBadge is
    ERC721,
    ERC721URIStorage,
    ERC721Pausable,
    Ownable,
    ERC721Burnable
{
    uint256 private _nextTokenId;
    string private _baseBadgeURI;
    mapping(address => bool) public hasMinted;

    event ExplorerBadgeMinted(address indexed recipient, uint256 indexed tokenId);

    constructor(address initialOwner)
        ERC721("Nexus Explorer Badge", "NXEXP")
        Ownable(initialOwner)
    {
        _baseBadgeURI = "ipfs://bafkreid2wtv65ife2zk2wic4exfn5whxk4gcy4ly4ybfvxuywjtvmips2e";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /// @notice Mint a badge to the recipient with predefined metadata
    function mintExplorerBadge() public {
    require(!hasMinted[msg.sender], "Already minted");
    uint256 tokenId = _nextTokenId++;
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, _baseBadgeURI);
    hasMinted[msg.sender] = true;
    emit ExplorerBadgeMinted(msg.sender, tokenId);
    }

    /// @notice Return all token IDs owned by an address
    function getNFTsByAddress(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory result = new uint256[](balance);
        uint256 count = 0;
        uint256 total = _nextTokenId;

        for (uint256 i = 0; i < total; i++) {
            try this.ownerOf(i) returns (address tokenOwner) {
                if (tokenOwner == owner) {
                    result[count] = i;
                    count++;
                    if (count == balance) break;
                }
            } catch {
                // Token does not exist or was burned — skip
            }
        }

        return result;
    }

    /// Optional: allow the owner to update the base URI
    function updateBaseBadgeURI(string memory newUri) external onlyOwner {
        _baseBadgeURI = newUri;
    }

    // ───── Required Overrides ─────

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Pausable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
