import waitForContractTransactionToComplete from "../../lib/waitForContractTransactionToComplete.js";
    
describe('waitForContractTransactionToComplete', () => {
  const transactionResponse = { result: 'result' };
  const transaction = {
    wait: jest.fn().mockResolvedValue(transactionResponse)
  }

  it('should return the transaction result', async () => {
    const response = await waitForContractTransactionToComplete(transaction)
    expect(response).toBe(transactionResponse);
  });
});