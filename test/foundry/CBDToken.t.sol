// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../contracts/CBDToken.sol";
import "../../contracts/Purchase.sol";
import "../../contracts/test/Token.sol";

contract CBDTokenTest is Test {
    CBDToken public cbdToken;
    Token public usdc;
    Purchase public purchaseContract;


    address jack = vm.addr(1);
    address alice = vm.addr(2);

    function setUp() public {
        usdc = new Token(
            "USD Coin",
            "USDC",
            1000000e18
        );
        cbdToken = new CBDToken(
            "CBD Token",
            "CBD"
        );

        purchaseContract = new Purchase(
            address(cbdToken),
            address(usdc),
            20e18
        );
        cbdToken.addDistributor(address(purchaseContract));
    }

    function testPrice() public {
        assertEq(purchaseContract.tokenPrice(), 20e18);
        purchaseContract.setTokenPrice(22e18);
        assertEq(purchaseContract.tokenPrice(), 22e18);
    }

    function testMint() public {
        cbdToken.mint(alice, 1e18);
        assertEq(cbdToken.balanceOf(alice), 1e18);
    }

    function testPurchaseToken() public {
        assertEq(purchaseContract.purchaseToken(), address(usdc));
    }

    function testBuy() public {
        usdc.approve(address(purchaseContract), 80e18);
        purchaseContract.buyToken(4);
        assertEq(cbdToken.balanceOf(address(this)), 4e18);
    }

    
}
