const hre = require("hardhat");
const path = require("path");

async function mintNFT(recipient, metadataURI) {
  try {
    console.log("🔧 Compiling contracts...");
    await hre.run("compile");

    const network = hre.network.name;
    console.log(`🌐 Running on network: ${network}`);

    const [minter] = await hre.ethers.getSigners();
    console.log("👤 Minter address:", minter.address);

    const contractAddress = "0x313D3BAF210179b670Ca4e2a31F9AcACc7418B74";

    // Dynamically load ABI
    const contractPath = path.join(__dirname, "../artifacts/contracts/MyNft.sol/MyNFT.json");
    const contractABI = require(contractPath).abi;

    console.log("✅ ABI and contract address loaded.");

    // Connect to contract
    const nftContract = new hre.ethers.Contract(contractAddress, contractABI, minter);

    console.log(`🚀 Minting NFT to: ${recipient}`);
    console.log(`🖼️ Metadata URI: ${metadataURI}`);

    const txn = await nftContract.mintNFT(recipient, metadataURI);
    await txn.wait();

    console.log("✅ NFT Minted! Transaction Hash:", txn.hash);
    return txn.hash;

  } catch (error) {
    console.error("❌ Error while minting NFT:", error.message || error);
  }
}

module.exports = { mintNFT };
