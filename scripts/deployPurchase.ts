import { ethers, network } from "hardhat";
require("dotenv").config()
import "@nomiclabs/hardhat-ethers"
const hre = require("hardhat");


async function main() {
  // goerliCBD = 0x6e8eCf88F39E08e06764Ff26d67c1ed99f8ea1CE
  // goerliPurchase = 0x2F49676E78f0480889A87603e971C13C7058C11e
  const Purchase = await ethers.getContractFactory("Purchase");
  const purchase = await Purchase.deploy(
    process.env.GOERLI_CBD as string,
    process.env.GOERLI_USDC as string,
    `${20*10**18}`
  );

  await purchase.deployed();

  console.log(`Purchase contract deployed to ${purchase.address}`);

  if (network.name == "hardhat" || network.name == "localhost") return
  await purchase.deployTransaction.wait(21)
  console.log("Verifing...")
  await hre.run("verify:verify", {
    address: purchase.address,
    constructorArguments: [
        process.env.GOERLI_CBD as string,
        process.env.GOERLI_USDC as string,
        `${20*10**18}`
    ],
  })
  console.log("Contract verified successfully !")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
