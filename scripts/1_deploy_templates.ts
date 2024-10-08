import { ethers } from "hardhat";

async function main() {
  const templates = await ethers.deployContract("Templates");
  await templates.waitForDeployment();
  console.log(`Tempates deployed to ${templates.target}`);
}

main()
