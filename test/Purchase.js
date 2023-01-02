const { expect } = require("chai");
const { ethers } = require("hardhat");
const {Contract} = require("ethers");

escribe("Purchase", () => {
    it("should allow buyer/user to buy tokens", async () => {
      // Load contract
      const Purchase = await ethers.getContractFactory("Purchase");
      const purchase = await Purchase.deploy();
      await purchase.deployed();
  
      // Set up accounts and balance
      const [buyer] = await ethers.getSigners();
      const userAddress = await buyer.getAddress();
      const initialBalance = await buyer.getBalance();
  
      // Set up purchase token
      const purchaseToken = await ethers.getContractFactory("MockToken");
      const purchaseContract = await purchaseToken.deploy();
      await purchaseContract.deployed();
      await purchaseContract.transfer(userAddress, ethers.utils.parseEther("100"));
  
      // Set up CBD token
      const cbdToken = await ethers.getContractFactory("MockToken");
      const cbdContract = await cbdToken.deploy();
      await cbdContract.deployed();
  
      await purchase.setCBDToken(cbdContract.address);
      await purchase.setPurchaseToken(purchaseContract.address);
      await purchase.setTokenPrice(ethers.utils.parseEther("1"));
  
      const quantity = 10;
      const expectedTokenBalance = quantity * 1e18;
      await purchase.buyToken(quantity);
  
      // Check if the user has received the tokens and the balance has been transferred to the owner
      const cbdTokenBalance = await cbdContract.balanceOf(userAddress);
      expect(cbdTokenBalance.toNumber()).to.equal(expectedTokenBalance);
      const purchaseTokenBalance = await purchaseContract.balanceOf(userAddress);
      expect(purchaseTokenBalance.toNumber()).to.equal(0);
      const ownerBalance = await purchaseContract.balanceOf(await purchase.owner());
      expect(ownerBalance.toNumber()).to.equal(ethers.utils.parseEther("100"));
      const finalBalance = await buyer.getBalance();
      expect(finalBalance.toNumber()).to.equal(initialBalance.toNumber()

    }
  }

