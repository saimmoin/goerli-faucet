require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.1',
  networks: {
    goerli: {
      url: "https://quick-palpable-shard.ethereum-goerli.discover.quiknode.pro/db9d6900093b79890d62b9486d9ff8c3b4850ef8/",
      accounts: ["6dced152d4cb969b301ea0cd032f0491058ac1486d08c34e4fc3ed2011dfb940"],
    },
  },
};