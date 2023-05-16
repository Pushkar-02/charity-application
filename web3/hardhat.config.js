/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "polygon_mumbai",
    networks: {
      hardhat: {},
      goerli: {
        url: "https://rpc.ankr.com/eth_goerli",
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      },
      polygon_mumbai: {
        url: "https://rpc-mumbai.maticvigil.com",
        accounts: [
          `0xdea6b9a8364118fa99231235340adecf80a4b5db0c79cd09ec1dc02da8ed4501`,
        ],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
