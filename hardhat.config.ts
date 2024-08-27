import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localtest: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "46b9e861b63d3509c88b7817275a30d22d62c8cd8fa6486ddee35ef0d8e0495f",
      ],
    },
    ecfx_test: {
      url: "https://evmtestnet.confluxrpc.com",
      accounts: [
        "7c5da44cf462b81e0b61a582f8c9b23ca78fc23e7104138f4e4329a9b2076e23",//0x26154DF6A79a6C241b46545D672A3Ba6AE8813bE
      ]
    }
  },
};

export default config;
