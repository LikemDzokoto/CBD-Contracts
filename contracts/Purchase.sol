// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CBDToken.sol";

contract Purchase is Ownable {

    CBDToken public cbdToken;
    address public purchaseToken;
    uint public tokenPrice;



    /**
    @param _cbdToken : CBD token address
    @param _purchaseToken : address of the stablecoin that user can pay for buy
    @param _tokenPrice: price of each token. This price should be in format of purchase token.(if purchase token has 18 decimals, this input amount should has 18 decimals too)
    @notice usdc on polygon has 6 decimals so price should has 6 decimals
     */
    constructor(address _cbdToken, address _purchaseToken, uint _tokenPrice) {
        cbdToken = CBDToken(_cbdToken);
        purchaseToken = _purchaseToken;
        tokenPrice = _tokenPrice;
    }


    
    //set purchase token
    function setPurchaseToken(address _purchaseToken) public onlyOwner {
        require(_purchaseToken != address(0), "Purchase token can not be zero address");
        purchaseToken = _purchaseToken;
    }

    //set CBD token
    function setCBDToken(address _CBDToken) public onlyOwner {
        require(_CBDToken != address(0), "CBD token can not be zero address");
        cbdToken = CBDToken(_CBDToken);
    }

   
    /**
    @dev set token price by the owner (should be in wei)
    @param _newTokenPrice should be on format of purchase token price (18 decimal or other)
    @notice usdc on polygon has 6 decimals so price should has 6 decimals
     */
    function setTokenPrice(uint _newTokenPrice) public onlyOwner {
        tokenPrice = _newTokenPrice;
    }

    /**
    @dev user can buy token by paying stable coin
    all stable coin will be transfered to the wallet of owner
    @param quantity is number of tokens that user wants to buy (should be in ether format without number)
     */
    function buyToken(uint quantity) public {
        require(IERC20(purchaseToken).balanceOf(msg.sender) >= quantity*tokenPrice, "You don't have enough stablecoin balance to buy");
        cbdToken.mint(msg.sender, quantity*1e18);
        IERC20(purchaseToken).transferFrom(msg.sender, owner(), quantity*tokenPrice);
    }


}