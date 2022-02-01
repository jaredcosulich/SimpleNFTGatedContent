const waitForContractTransactionToComplete = async (transaction) => {
  const result = await transaction.wait()
  return result;
}

export default waitForContractTransactionToComplete;