const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Purchase", () => {
    it("should allow buyer/user to buy tokens", async () => {
      // Load contract
      const Purchase = await ethers.getContractFactory("Purchase");
    
  
      // Set up accounts and balance
      const [buyer] = await ethers.getSigners();
      const userAddress = await buyer.getAddress();
      const initialBalance = await buyer.getBalance();
  
      // Set up purchase token, the address is usdc adddress on goerli
      const purchaseToken = (await ethers.getContractFactory()).attach("0x07865c6e87b9f70255377e024ace6630c1eaa37f");
      await purchaseToken.transfer(userAddress, ethers.utils.parseEther("100"));
  
      // Set up CBD token
      const cbdToken = (await ethers.getContractFactory()).attach("0x6e8eCf88F39E08e06764Ff26d67c1ed99f8ea1CE");
      await Purchase.setCBDToken(cbdContract.address);
      await Purchase.setPurchaseToken(purchaseToken.address);
      await Purchase.setTokenPrice(ethers.utils.parseEther("1"));
  
      const quantity = 10;
      const expectedTokenBalance = quantity * 1e18;
      await Purchase.buyToken(quantity);
  
      // Check if the user has received the tokens and the balance has been transferred to the owner
      const cbdTokenBalance = await cbdContract.balanceOf(userAddress);
      expect(cbdTokenBalance.toNumber()).to.equal(expectedTokenBalance);
      const purchaseTokenBalance = await purchaseToken.balanceOf(userAddress);
      expect(purchaseTokenBalance.toNumber()).to.equal(0);
      const ownerBalance = await purchaseToken.balanceOf(await Purchase.owner());
      expect(ownerBalance.toNumber()).to.equal(ethers.utils.parseEther("100"));
      const finalBalance = await buyer.getBalance();
      expect(finalBalance.toNumber()).to.equal(initialBalance.toNumber());

    });
  });


