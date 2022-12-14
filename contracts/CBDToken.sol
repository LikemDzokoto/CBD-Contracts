// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CBDToken is ERC20, ERC20Burnable, Ownable {

    

    mapping(address => bool) public distributors; //is given address distributor 

    /**
    @param _name : token name
    @param _symbol : token symbol
     */
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}


    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwnerOrDistributor() {
        _checkOwnerOrDistributor();
        _;
    }
    
    // Check msg.sender should be owner or ditributor
    function _checkOwnerOrDistributor() internal view virtual {
        require(owner() == _msgSender() || distributors[_msgSender()], "Ownable_Distributor: caller is not the owner or distributor");
    }

    
    /**
    @param _distributor is a contract or wallet address that can mint or burn tokens
     */
    function addDistributor(address _distributor) external onlyOwner {
    distributors[_distributor] = true;
    }

    function removeDistributor(address _distributor) external onlyOwner {
    distributors[_distributor] = false;
    }


    //mint tokens by owner or distributor
    function mint(address to, uint256 amount) public onlyOwnerOrDistributor {
        _mint(to, amount);
    }

    function burn(address account, uint amount) public onlyOwnerOrDistributor {
        _burn(account, amount);
    }


}