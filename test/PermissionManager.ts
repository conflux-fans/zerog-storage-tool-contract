import { expect } from "chai";
import { ethers } from "hardhat";
import { PermissionManager } from "../typechain-types";

describe("PermissionManager", function () {
  let permissionManager: PermissionManager;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const PermissionManagerFactory = await ethers.getContractFactory("PermissionManager");
    permissionManager = await PermissionManagerFactory.deploy();
    await permissionManager.waitForDeployment();
  });

  describe("部署", function () {
    it("应该正确设置所有者", async function () {
      expect(await permissionManager.owner()).to.equal(owner.address);
    });

    it("应该正确设置名称和符号", async function () {
      expect(await permissionManager.name()).to.equal("PermissionManager");
      expect(await permissionManager.symbol()).to.equal("PM");
    });
  });

  describe("铸造", function () {
    it("所有者应该能够铸造代币", async function () {
      await expect(permissionManager.safeMint(addr1.address))
        .to.emit(permissionManager, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, 1);
      
      expect(await permissionManager.ownerOf(1)).to.equal(addr1.address);
      expect(await permissionManager.balanceOf(addr1.address)).to.equal(1);
    });

    it("非所有者不应该能够铸造代币", async function () {
      await expect(permissionManager.connect(addr1).safeMint(addr2.address))
        .to.be.revertedWithCustomError(permissionManager, "OwnableUnauthorizedAccount");
    });
  });

  describe("转移", function () {
    beforeEach(async function () {
      await permissionManager.safeMint(addr1.address);
    });

    it("代币持有者应该能够转移代币", async function () {
      await expect(permissionManager.connect(addr1).transferFrom(addr1.address, addr2.address, 1))
        .to.emit(permissionManager, "Transfer")
        .withArgs(addr1.address, addr2.address, 1);

      expect(await permissionManager.ownerOf(1)).to.equal(addr2.address);
    });

    it("非代币持有者不应该能够转移代币", async function () {
      await expect(permissionManager.connect(addr2).transferFrom(addr1.address, addr2.address, 1))
        .to.be.revertedWithCustomError(permissionManager, "ERC721InsufficientApproval");
    });
  });

  describe("枚举", function () {
    beforeEach(async function () {
      await permissionManager.safeMint(addr1.address);
      await permissionManager.safeMint(addr2.address);
    });

    it("应该正确返回总供应量", async function () {
      expect(await permissionManager.totalSupply()).to.equal(2);
    });

    it("应该正确返回指定索引的代币ID", async function () {
      expect(await permissionManager.tokenByIndex(0)).to.equal(1);
      expect(await permissionManager.tokenByIndex(1)).to.equal(2);
    });

    it("应该正确返回指定所有者和索引的代币ID", async function () {
      expect(await permissionManager.tokenOfOwnerByIndex(addr1.address, 0)).to.equal(1);
      expect(await permissionManager.tokenOfOwnerByIndex(addr2.address, 0)).to.equal(2);
    });
  });
});
