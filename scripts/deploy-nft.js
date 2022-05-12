const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(
    "NFT Token",
    "NFT",
    "1000000000000000000" // 1 ether
  );

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
