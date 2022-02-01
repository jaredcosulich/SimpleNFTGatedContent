import { ethers } from 'ethers';

const instantiateContract = (contractJSON, provider) => {
  const contractAddress = contractJSON.address;
  const contractAbi = contractJSON.abi;

  const contract = new ethers.Contract(
    contractAddress, 
    contractAbi, 
    provider
  );
  return contract;
}

export default instantiateContract;
