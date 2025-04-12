const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(); // Get the first local account
  
  console.log("Deploying contract with address:", deployer.address);

  // Compile & deploy the contract
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  await myNFT.waitForDeployment();

  console.log("Contract deployed at:", await myNFT.getAddress());
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//0x313D3BAF210179b670Ca4e2a31F9AcACc7418B74