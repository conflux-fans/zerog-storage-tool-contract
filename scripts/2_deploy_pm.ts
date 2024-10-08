import { ethers } from "hardhat";

async function main() {
  const pm = await ethers.deployContract("PermissionManager");
  await pm.waitForDeployment();
  console.log(`PermissionManager deployed to ${pm.target}`);
}

main()
