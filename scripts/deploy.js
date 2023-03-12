const hre = require('hardhat');

async function main() {
    const Bank = await hre.ethers.getContractFactory('Bank');
    const bank = await Bank.deploy();
    await bank.deployed();
    console.log("Contract Address: ", bank.address)
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain();