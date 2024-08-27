import { ethers } from "hardhat";

async function main() {

  const templates = await ethers.deployContract("Templates");
  await templates.waitForDeployment();

  console.log(
    `Tempates deployed to ${templates.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
