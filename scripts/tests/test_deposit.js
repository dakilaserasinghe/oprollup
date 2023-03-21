// add the game address here and update the contract name if necessary
const contractAddr = process.env.LOCALHOST_CONTRACT_ADDRESS;
const contractName = "OPR_Contract";
const brotli = require('brotli');
const { ethers } = require('hardhat');

async function main() {
    // attach to the game
    const contract = await hre.ethers.getContractAt(contractName, contractAddr);
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const tx_1 = await contract.deposit({value : ethers.utils.parseEther("0.001")});
    const receipt_1 = await tx_1.wait();
    console.log(receipt_1);

    // const tx_2 = await contract.connect(addr1).deposit({value : ethers.utils.parseEther("0.001")});
    // const receipt_2 = await tx_2.wait();
    // console.log(receipt_2);

    // const tx_3 = await contract.connect(addr2).deposit({value : ethers.utils.parseEther("0.001")});
    // const receipt_3 = await tx_3.wait();
    // console.log(receipt_3);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
